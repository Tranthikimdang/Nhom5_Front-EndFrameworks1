const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUserByEmailAndPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'error', message: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { userEmail: email } });

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ status: 'error', message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.userId, email: user.userEmail }, 'secret_key', { expiresIn: '1h' });

    res.status(200).json({ status: 'success', data: { user, token } });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message || 'Some error occurred while retrieving the user.' });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ where: { userEmail: email } });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving the user.",
    });
  }
};

exports.getAllUser = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({
      status: "success",
      results: users.length,
      data: {
        users,
      },
    });
  } catch (err) {
    res.status(500).send({
      status: "error",
      message: err.message || "Some error occurred while retrieving users.",
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { userName, userEmail, userPhone, userAddress, password } = req.body;

    const newUser = await User.create({ userName, userEmail, userPhone, userAddress, password });
    res.status(201).json({ status: "success", data: { user: newUser } });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, userEmail, userPhone, userAddress } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    user.userName = userName;
    user.userEmail = userEmail;
    user.userPhone = userPhone;
    user.userAddress = userAddress;

    await user.save();

    res.status(200).json({ status: "success", data: { user } });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    await user.destroy();

    res.status(200).json({ status: "success", message: "User deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
