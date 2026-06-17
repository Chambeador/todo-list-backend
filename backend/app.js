require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const todoListRoutes = require("./routes/todoListRoutes");
const fileRoutes = require("./routes/fileRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/files", fileRoutes);
app.use("/todolists", todoListRoutes);
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hola estoy probando" });
});

app.listen(3000, () => {
  console.log("hola desde el servidor");
});