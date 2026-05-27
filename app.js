const express = require("express");

const taskRoutes = require("./routes/taskRoutes")
const app = express();

app.use(express.json());
//todo lo que empiece en task mandarlo a 
app.use("/tasks", taskRoutes);

app.get("/", (req, res) =>{
    res.json({
        message: "HOla estoy probando"
    });
});

app.listen(3000, () => {
    console.log("hola desde el servidor");
});

// flujo sera
// routes -> controiller -> prisma 