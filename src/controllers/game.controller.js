import fs from "fs";
import GameModel from "../models/gameModel.js";
import AppError from "../utils/appError.js";

/* ======================= Get all games ======================= */
const getGames = async (req, res) => {
  try {
    const games = await GameModel.find();
    res.status(200).json({ message: "Games fetched successfully", games });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================= Get game ======================= */
const getGame = async (req, res, next) => {
  const { gameId } = req.params;

  const game = await GameModel.findById(gameId);
  if (!game) {
    return next(new AppError("Game Not Found", 404));
  }
  res.status(200).json({ message: "success", game });
};

/* ======================= Create all games ======================= */

const createGame = async (req, res, next) => {
  const { title, description, price, platform, genre } = req.body;

  const gameIsExist = await GameModel.findOne({ title });

  if (gameIsExist) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) return next(new AppError(err.message, 500));
      });
    }
    return next(new AppError("Game already exist", 409));
  }

  const coverImage = req.file && req.file.path;

  const newGame = new GameModel({
    title,
    description,
    price,
    platform,
    genre,
    coverImage,
  });
  if (coverImage) {
    newGame.coverImage = coverImage;
  }

  await newGame.save();

  return res
    .status(201)
    .json({ message: "Game created successfully", game: newGame });
};

/* ======================= Update a game ======================= */
const updateGame = async (req, res, next) => {
  const { id } = req.params;
  const { title, description, price, platform, genre, stock } = req.body || {};

  const game = await GameModel.findById(id);
  if (!game) {
    if (req.file) {
      fs.unlink(req.file.path, (err) => {
        if (err) return next(new AppError(err.message, 500));
      });
    }
    return next(new AppError("Game not found", 404));
  }

  const coverImage = req.file ? req.file.path : undefined;

  const updateData = {};
  if (title) updateData.title = title;
  if (description) updateData.description = description;
  if (price !== undefined && price !== null) updateData.price = price;
  if (platform) updateData.platform = platform;
  if (genre) updateData.genre = genre;
  if (stock !== undefined && stock !== null) updateData.stock = stock;
  if (coverImage) updateData.coverImage = coverImage;

  if (Object.keys(updateData).length === 0) {
    return next(new AppError("No fields to update", 400));
  }

  const updatedGame = await GameModel.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  res
    .status(200)
    .json({ message: "Game updated successfully", game: updatedGame });
};

/* ======================= Delete a game ======================= */
const deleteGame = async (req, res, next) => {
  const { id } = req.params;

  const deletedGame = await GameModel.findById(id);

  if (!deletedGame) {
    return next(new AppError("Game not found", 404));
  }

  if (deletedGame.coverImage) {
    fs.unlink(deletedGame.coverImage, (err) => {
      if (err) {
        console.error("Error deleting uploaded file:", err.message);
      }
    });
  }

  await GameModel.deleteOne(deletedGame);

  res.status(200).json({ message: "Game deleted successfully" });
};

export { createGame, deleteGame, getGame, getGames, updateGame };
