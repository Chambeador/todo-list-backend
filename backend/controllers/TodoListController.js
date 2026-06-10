const prisma = require("../prisma/prisma");

const getTodoLists = async(req, res) =>{
    try{
        const userId = req.user.userId;
        const todoLists = await prisma.todoList.findMany({
            where: { deletedAt: null,userId: userId},
              include: { tasks: true }
        });

        res.status(200).json({
            success: true,
            data: todoLists
        });

    }catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getTodoLists
};