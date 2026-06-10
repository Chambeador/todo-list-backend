const express = require("express");


const authMiddleware = require("../middlewares/authMiddleware");
//organizdor de rutas
const router = express.Router();

const {getTasks, createTask, updateTask, deleteTask} = require("../controllers/taskController");

router.get("/", authMiddleware, getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask)


module.exports = router;