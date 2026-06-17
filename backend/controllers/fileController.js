const cloudinary = require("../src/config/cloudinary.js");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const uploadFile = async (req, res) => {
  try {
    const file = req.file;
    const { todoListId } = req.body;

    if (!file) return res.status(400).json({ message: "Falta archivo" });

    const stream = cloudinary.uploader.upload_stream(
      {
        resource_type: "image",
        format: "pdf",
        public_id: file.originalname,
      },
      async (error, result) => {
        if (error) return res.status(500).json({ message: "error de cloudinary" });

        const newFile = await prisma.file.create({
          data: {
            name: file.originalname,
            url: result.secure_url,
            todoListId,
          },
        });

        return res.status(201).json({ data: newFile });
      }
    );

    stream.end(file.buffer);

  } catch (error) {
    res.status(500).json({ message: "Servidor error", 
                            error: error.message });
  }
};

const getFiles = async (req, res) => {
  try {
    const { todoListId } = req.params;
    const files = await prisma.file.findMany({
      where: { todoListId }
    });
    return res.status(200).json({ data: files });
  } catch (error) {
    res.status(500).json({ message: "Servidor error", 
                          error: error.message });
  }
};

module.exports = { uploadFile, getFiles };