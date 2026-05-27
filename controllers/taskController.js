const prisma = require("../prisma/prisma");

const getTasks = async(req, res) =>{
    try {
        const tasks = await prisma.task.findMany();
        res.status(200).json({
            success: true,
            data: tasks
        });
    }catch (error){

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const createTask = async(req, res) =>{
    try{
        const {title, description, priority, todoListId} = req.body;
        if(!title){
            return res.status(400).json({
                success: false,
                message: "El titulo es requerido"
            });
        }
        const task = await prisma.task.create({
            data: {
                title,description,priority,todoListId
            }
        });

        res.status(201).json({
            success: true,
            data: task
        });
    }catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


const updateTask = async(req, res) =>{
    try{
        const {id} = req.params;
        const {title, description, priority, todoListId} = req.body;
        const task = await prisma.task.update({
            where: {id},
            data: {
                title,description, priority, completed
            }
        });
        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



module.exports = {
    getTasks, createTask, updateTask
}
