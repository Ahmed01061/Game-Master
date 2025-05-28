import GameModel from "../models/gameModel.js";

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

/* ======================= Create all games ======================= */

const createGame = async (req, res) => {
  try {
    const { title, description, price, platform, genre } = req.body;

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

    res
      .status(201)
      .json({ message: "Game created successfully", game: newGame });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { createGame, getGames };
