import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    name:{
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: String
    },
    category: {
        type: String
    },
    image: {
        type: String
    }
})

export const bookModel = mongoose.model("Book", bookSchema);