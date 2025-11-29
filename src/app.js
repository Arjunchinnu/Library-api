import express from "express";
import morgan from "morgan";
import { logger } from "./middlewares/logger.js";
import { notFound } from "./middlewares/404handler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(logger);
app.set('view engine', 'ejs');

app.get("/", (req, res) => {
  res.send("welcome to library");
});

app.use("/users/api", userRoutes);
app.use("/books/api", bookRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
