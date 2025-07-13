import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRouter from './routes/userRouter.js';
import bookRouter from './routes/bookRouter.js';
import cors from 'cors'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/book", bookRouter);

try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DataBase is Connected")
} catch (error) {
    res.status(400).json({
        message: "Errror in database Connection"
    })
}

const port = process.env.PORT || 4001;
app.listen(port, () => {
    console.log(`app is listening on port${port}`)
})