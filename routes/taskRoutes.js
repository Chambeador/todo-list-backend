const express = require("express");

//organizdor de rutas
const router = express.Router();

const {getTasks, createTask, updateTask} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", updateTask);


module.exports = router;