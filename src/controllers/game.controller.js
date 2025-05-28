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

export { getGames };
