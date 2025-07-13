import { bookModel } from "../models/bookModel.js";

export const getBook = async(req, res) => {
    try {
        const book = await bookModel.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};