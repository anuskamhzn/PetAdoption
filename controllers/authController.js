import userModel from "../models/userModel.js";
import {comparePassword, hashPassword} from "./../utils/authHelper.js"
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      const role = req.body.role; // Extract role from the request body
      // Validations
      if (!name || !email || !password || !phone || !address || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // Check if the user already exists
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists, please login instead" });
      }
      // Hash the password
      const hashedPassword = await hashPassword(password);
      // Register the user
      const user = await new userModel({
        name,
        email,
        phone,
        address,
        password: hashedPassword,
        role,
      }).save();
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error in registration", error });
    }
};

export const sregisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address, pan } = req.body;
    const role = req.body.role; // Extract role from the request body
    // Validations
    if (!name || !email || !password || !phone || !address || !role || !pan) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists, please login instead" });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);
    // Register the user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      role,
      pan,
    }).save();
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error in registration", error });
  }
};

export const approveShelter = async (req, res) => {
  try {
    const { shelterId } = req.params;
    // Find shelter by ID
    // Update shelter status to 'approved'
    const shelter = await userModel.findByIdAndUpdate(shelterId, { status: 'approved' }, { new: true });
    res.status(200).json({ success: true, message: 'Shelter approved successfully', shelter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in approving shelter', error });
  }
};

export const rejectShelter = async (req, res) => {
  try {
    const { shelterId } = req.params;
    // Find shelter by ID
    // Update shelter status to 'rejected'
    const shelter = await userModel.findByIdAndUpdate(shelterId, { status: 'rejected' }, { new: true });
    res.status(200).json({ success: true, message: 'Shelter rejected successfully', shelter });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error in rejecting shelter', error });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try{
        const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
        role: user.role,
      },
      token,
    });
    }catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in login",
          error,
        });
      }
}; 

//forgot password controller
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, phone, newpassword } = req.body;
    if (!email) {
      return res.status(400).send({ message: "Email is required" });
    }
    if (!phone) {
      return res.status(400).send({ message: "Phone Number is required" });
    }
    if (!newpassword) {
      return res.status(400).send({ message: "New Password is required" });
    }
    //check user and answer
    const user = await userModel.findOne({ email, phone });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newpassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    return res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//test controller
export const testController = (req, res) => {
    try {
      res.send("Protected Routes");
    } catch (error) {
      console.log(error);
      res.send({ error });
    }
  };

//update profile
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

//update shelter prfile
export const updateSProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hashPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

// get all users
export const userController = async (req, res) => {
  try {
    const user = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All User List",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};