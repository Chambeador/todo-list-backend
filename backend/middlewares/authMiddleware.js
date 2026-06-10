const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) =>{
    try{
        const authHead = req.headers.authorization;
        if(!authHead){
            return res.status(401).json({
                success: false,
                message: "Token requerido"
            });
        }

        const token = authHead.split(" ")[1];
        const decoded = jwt.verify(token, "clave_secreta");

        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            success: false,
            message: "Token inválido"
        });

    }

};

module.exports = authMiddleware;