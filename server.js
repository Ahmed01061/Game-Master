import "dotenv/config";
import express from "express";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.routes.js";
import cartRouter from "./src/routes/cart.routes.js";
import gameRouter from "./src/routes/game.routes.js";
import userRouter from "./src/routes/user.routes.js";
import globalErrorHandler from "./src/utils/globalError.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/games", gameRouter);
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to GameHaven API" });
});

connectDB();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.all(/^.*$/, (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
