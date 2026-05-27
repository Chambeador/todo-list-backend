const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) =>{
    res.json({
        message: "HOla estoy probando"
    });
});

app.listen(3000, () => {
    console.log("hola desde el servidor");
});