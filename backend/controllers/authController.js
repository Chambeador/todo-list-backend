const prisma  = require("../prisma/prisma");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registro = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!email  || !password || !name) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos obligatorios"
            });
        }

        const existUser = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if (existUser){
            return res.status(400).json({
                success: false, 
                message: "Este usuario ya existe"
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {name, email, password: hashPassword}
        });
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if(!user){
            return res.status(404).json({
                success: false,
                message: "Usuario no fue encontrado"
            });
        }

        const validarPassword = await bcrypt.compare(password, user.password);
        if(!validarPassword){
            return res.status(401).json({
                success: false, 
                message: "Contraseña incorrecta"
            });
        }

        const token = jwt.sign({userId: user.id},"clave_secreta",{expiresIn: "1d"});

        res.status(200).json({
            success: true, 
            token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {
    registro,
    login
};
