const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, allergies, skinCondition } = req.body;

    // CHECK USER EXISTS
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // CREATE USER
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone: phone || "",
      allergies: allergies || "",
      skinCondition: skinCondition || ""
    });

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User Registered",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        allergies: user.allergies,
        skinCondition: user.skinCondition,
        role: user.role,
        notifEmail: user.notifEmail,
        notifPush: user.notifPush
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECK USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Email"
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Password"
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        allergies: user.allergies,
        skinCondition: user.skinCondition,
        role: user.role,
        notifEmail: user.notifEmail,
        notifPush: user.notifPush
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET CURRENT USER PROFILE
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        allergies: user.allergies,
        skinCondition: user.skinCondition,
        role: user.role,
        notifEmail: user.notifEmail,
        notifPush: user.notifPush
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE USER PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, phone, allergies, skinCondition, avatar, notifEmail, notifPush } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (name) user.name = name;
    if (email) {
      const emailExists = await User.findOne({ email, _id: { $ne: req.user.id } });
      if (emailExists) {
        return res.status(400).json({
          message: "Email already in use"
        });
      }
      user.email = email;
    }
    if (phone !== undefined) user.phone = phone;
    if (allergies !== undefined) user.allergies = allergies;
    if (skinCondition !== undefined) user.skinCondition = skinCondition;
    if (avatar !== undefined) user.profileImage = avatar;
    if (notifEmail !== undefined) user.notifEmail = notifEmail;
    if (notifPush !== undefined) user.notifPush = notifPush;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        allergies: user.allergies,
        skinCondition: user.skinCondition,
        role: user.role,
        profileImage: user.profileImage,
        notifEmail: user.notifEmail,
        notifPush: user.notifPush
      }
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};