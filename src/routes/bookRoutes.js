import express from "express";
import auth from "../middlewares/auth.js";
import role from "../middlewares/role.js";

import {
  createBook,
  updateBook,
  getBooks,
  deleteBook,
} from "../controllers/booksController.js";
const router = express.Router();

router.post("/", auth, role(["admin"]), createBook);
router.get("/", auth, getBooks);
router.put("/:id", auth, role(["admin"]), updateBook);
router.delete("/:id", auth, role(["admin"]), deleteBook);

export default router;
