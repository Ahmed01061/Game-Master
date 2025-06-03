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

/* ======================= Update a game ======================= */
const updateGame = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }

    const { id } = req.params;
    const { title, description, price, platform, genre, stock } = req.body;

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
      return res
        .status(400)
        .json({ message: "No valid fields provided for update" });
    }

    const updatedGame = await GameModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res
      .status(200)
      .json({ message: "Game updated successfully", game: updatedGame });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================= Delete a game ======================= */
const deleteGame = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ errors: errors.array().map((err) => err.msg) });
    }

    const { id } = req.params;

    const deletedGame = await GameModel.findByIdAndDelete(id);

    if (!deletedGame) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ message: "Game deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export { createGame, getGames, updateGame, deleteGame };
