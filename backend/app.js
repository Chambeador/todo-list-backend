const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const todoListRoutes = require("./routes/todoListRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/todolists", todoListRoutes);
//todo lo que empiece en task mandarlo a 
app.use("/tasks", taskRoutes);
app.use("/auth", authRoutes)

app.get("/", (req, res) =>{
    res.json({
        message: "HOla estoy probando"
    });
});

//puerto 3000
app.listen(3000, () => {
    console.log("hola desde el servidor");
});

// flujo sera
// routes -> controiller -> prisma 