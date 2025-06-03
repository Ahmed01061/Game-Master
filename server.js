import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import gameRouter from "./src/routes/game.routes.js";
import userRouter from "./src/routes/user.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/users", userRouter);

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
