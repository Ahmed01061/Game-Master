import { Schema, model } from "mongoose";

const gameModel = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    enum: ["Action", "Adventure", "RPG", "Puzzle", "Sports", "Strategy"],
    required: true,
  },
  Stock: {
    type: Number,
    default: 50,
  },
});

const GameModel = model("Game", gameModel);

export default GameModel;
