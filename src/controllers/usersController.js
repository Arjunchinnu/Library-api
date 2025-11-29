import { users } from "../database/memory.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (users.find((u) => u.email === email))
    return res.status(400).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length + 1,
    name,
    email,
    password: hashed,
    role: role || "customer",
  };

  users.push(newUser);

  const { password: pwd, ...userResponse } = newUser;

  res.status(201).json({ message: "User registered", user: userResponse });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(400).json({ message: "Invalid email" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ message: "Login successful", token });
};

export const getUsers = (req, res, next) => {
  const user = users.find((u) => u.role == "admin");
  if (!user) {
    res
      .status(403)
      .json({ status: "failure", message: "Only admin has Access" });
  }
  const allUsers = users.map(({ name, email, role }) => ({
    name,
    email,
    role,
  }));
  res.status(200).json({ status: "success", users: allUsers });
};
