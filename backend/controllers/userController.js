const User = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const getDataUri = require("../utils/datauri");
const cloudinary = require("../utils/cloudinary");

const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists with this email.",
        success: false,
      });
    }

    let profilePhotoUrl = null;
    if (req.files && req.files.profilePhoto && req.files.profilePhoto[0]) {
      const fileUri = getDataUri(req.files.profilePhoto[0]);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      profilePhotoUrl = cloudResponse.secure_url;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
      user: {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
        profile: newUser.profile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }

    let user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password.", success: false });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account does not exist with current role.",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        success: true,
        user: {
          _id: user._id,
          fullname: user.fullname,
          email: user.email,
          phoneNumber: user.phoneNumber,
          role: user.role,
          profile: user.profile,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const userId = req.id;
    let user = await User.findById(userId);
    if (!user)
      return res
        .status(400)
        .json({ message: "User not found", success: false });

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) {
      user.profile.skills = Array.isArray(skills)
        ? skills
        : skills.split(",").map((s) => s.trim());
    }

    // Upload resume if exists
    if (req.files?.file?.[0]) {
      const resumeFile = req.files.file[0];
      const resumeUri = getDataUri(resumeFile);

      const cloudRes = await cloudinary.uploader.upload(resumeUri.content, {
        resource_type: "raw", // PDF is treated as raw
      });

      user.profile.resume = {
        url: cloudRes.secure_url,
        name: resumeFile.originalname, // This is the correct original filename
      };
    }

    // Upload profile photo if exists
    if (req.files && req.files.profilePhoto && req.files.profilePhoto[0]) {
      const photoUri = getDataUri(req.files.profilePhoto[0]);
      const cloudResponse = await cloudinary.uploader.upload(photoUri.content);
      user.profile.profilePhoto = cloudResponse.secure_url;
    }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong", success: false });
  }
};

module.exports = { register, login, updateProfile, logout };
