import UserModel from "../models/userModel.js";

const getUsers = async (req, res) => {
  const users = await UserModel.find();

  res.status(200).json({ message: "successfully", users });
};

export { getUsers };
