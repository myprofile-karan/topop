const bcrypt = require("bcryptjs");
const User = require("../models/user");
const qrcode = require("qrcode")

const registerUser = async (req, res) => {
  console.log(req.body);
  const { image_url, name, phoneNumber, email, password, termsAccepted } =
    req.body;

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = await bcrypt.hashSync(password, salt);

  try {
    //check if user alredy existed

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res
        .status(409)
        .json({ error: "User with this name already exists" });
    }

    // create user
    const newUser = await User.create({
      coverPhoto: image_url,
      name: name,
      phoneNumber:phoneNumber,
      email: email,
      password: hashPassword,
      termsAccepted: termsAccepted,
    });

    // qrcode.toDataURL(newUser, (err, src)=> {
    //   res.json(src);
    //   console.log("src: ", src);
    // })

    res.status(201).json({ message: "User created successfully", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const checkUser = async (req, res) => {
  try {
    const { email } = req.params;

    const existingUser = await User.findOne({ email });

    res.json({ exists: !!existingUser, existingUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const userProfile = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    
    const user = await User.findOne({ email });
    userString = JSON.stringify(user);
    if (user) {
      qrcode.toDataURL(userString, (err, src) => {
        if (err) {
          console.error("Error generating QR code:", err);
          res.status(500).json({ error: "Error generating QR code" });
        } else {
          res.json({ user, qrCode: src });
        }
      });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const findPosts = await User.find();
    res.json(findPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  registerUser,
  getUser,
  checkUser,
  userProfile,
};
