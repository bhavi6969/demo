const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const http = require("http");

let pythonProcess = null;
let pythonPort = null;
let isReady = false;
let isStarting = false;

const startDaemon = (modelDir) => {
  if (pythonProcess || isStarting) return;
  isStarting = true;
  isReady = false;

  const scriptPath = path.join(modelDir, "predict_server.py");
  if (!fs.existsSync(scriptPath)) {
    console.warn(`[Daemon] Daemon script not found at: ${scriptPath}`);
    isStarting = false;
    return;
  }

  const pythonCommands = ["py", "python", "python3"];
  let commandIndex = 0;

  const trySpawn = () => {
    if (commandIndex >= pythonCommands.length) {
      console.error("[Daemon] Failed to start Python daemon: No python command worked.");
      isStarting = false;
      return;
    }

    const cmd = pythonCommands[commandIndex];
    console.log(`[Daemon] Attempting to start daemon with command: ${cmd}`);

    const proc = spawn(cmd, [scriptPath]);
    let portMatched = false;

    proc.stdout.on("data", (data) => {
      const output = data.toString();
      console.log(`[Daemon Output]: ${output.trim()}`);
      
      const match = output.match(/PORT:(\d+)/);
      if (match) {
        pythonPort = parseInt(match[1], 10);
        isReady = true;
        isStarting = false;
        portMatched = true;
        pythonProcess = proc;
        console.log(`[Daemon] Python daemon successfully running on port ${pythonPort}`);
      }
    });

    proc.stderr.on("data", (data) => {
      console.error(`[Daemon Error Output]: ${data.toString().trim()}`);
    });

    proc.on("error", (err) => {
      if (!portMatched) {
        commandIndex++;
        trySpawn();
      }
    });

    proc.on("close", (code) => {
      console.warn(`[Daemon] Python process exited with code ${code}`);
      if (pythonProcess === proc) {
        pythonProcess = null;
        isReady = false;
        pythonPort = null;
      }
    });
  };

  trySpawn();
};

const stopDaemon = () => {
  if (pythonProcess) {
    console.log("[Daemon] Killing Python daemon...");
    pythonProcess.kill();
    pythonProcess = null;
    isReady = false;
    pythonPort = null;
  }
};

// Cleanup on node exit
process.on("exit", stopDaemon);
process.on("SIGINT", () => {
  stopDaemon();
  process.exit();
});
process.on("SIGTERM", () => {
  stopDaemon();
  process.exit();
});

const predictWithDaemon = (imagePath) => {
  return new Promise((resolve, reject) => {
    if (!isReady || !pythonPort) {
      return reject(new Error("Daemon is not ready."));
    }

    const data = JSON.stringify({ image_path: imagePath });
    const req = http.request(
      {
        hostname: "127.0.0.1",
        port: pythonPort,
        path: "/predict",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
        timeout: 15000, // 15 second timeout for inference
      },
      (res) => {
        let body = "";
        res.on("data", (chunk) => {
          body += chunk;
        });
        res.on("end", () => {
          try {
            if (res.statusCode === 200) {
              resolve(JSON.parse(body));
            } else {
              reject(new Error(`Daemon HTTP error status: ${res.statusCode}. Body: ${body}`));
            }
          } catch (e) {
            reject(new Error(`Failed to parse daemon response: ${e.message}`));
          }
        });
      }
    );

    req.on("error", (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
};

module.exports = {
  startDaemon,
  stopDaemon,
  predictWithDaemon,
  isDaemonReady: () => isReady,
};
