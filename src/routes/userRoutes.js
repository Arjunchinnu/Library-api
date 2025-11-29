import express from "express";
import { register, login, getUsers } from "../controllers/usersController.js";
import role from "../middlewares/role.js";
import auth from "../middlewares/auth.js";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/register",
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  register
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  login
);
router.get("/allusers", auth, [role(["admin"])], getUsers);
export default router;
