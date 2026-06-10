const express = require("express");


const authMiddleware = require("../middlewares/authMiddleware");
//organizdor de rutas
const router = express.Router();

const {getTasks, createTask, updateTask, deleteTask} = require("../controllers/taskController");

router.get("/", authMiddleware, getTasks);
router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);


module.exports = router;