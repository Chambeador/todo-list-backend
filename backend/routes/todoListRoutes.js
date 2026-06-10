const express = require("express");

const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const { getTodoLists } = require("../controllers/TodoListController");

router.get("/", authMiddleware, getTodoLists);

module.exports = router;