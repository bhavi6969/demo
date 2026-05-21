const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const Dataset = require("./models/Dataset");


// CONNECT MONGODB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));


// DATASET FOLDER
const datasetFolder = "./dataset";


// FUNCTION TO UPLOAD DATASET
const uploadDataset = async () => {

  try {

    // READ DISEASE FOLDERS
    const diseases = fs.readdirSync(datasetFolder);

    for (const disease of diseases) {

      // PATH OF EACH DISEASE FOLDER
      const diseasePath = path.join(datasetFolder, disease);

      // READ IMAGES INSIDE FOLDER
      const images = fs.readdirSync(diseasePath);

      for (const image of images) {

        // COMPLETE IMAGE PATH
        const imagePath = path.join(diseasePath, image);

        // STORE IN MONGODB
        await Dataset.create({

          diseaseName: disease,

          imageName: image,

          imagePath: imagePath

        });

        console.log(`Uploaded: ${image}`);

      }

    }

    console.log("Dataset Upload Complete");

    process.exit();

  } catch (error) {

    console.log(error);

  }

};


// RUN FUNCTION
uploadDataset();