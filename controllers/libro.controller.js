import db from "../models/index.js";
const Libro = db.Libro;

export const getLibros = async (req, res) => {
    try {
        const libros = await Libro.findAll();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener libros", error });
    }
};

export const createLibro = async (req, res) => {
    try {
        const nuevoLibro = await Libro.create(req.body);
        res.status(201).json({ message: "Libro creado correctamente", libro: nuevoLibro });
    } catch (error) {
        res.status(500).json({ message: "Error al crear libro", error });
    }
};
