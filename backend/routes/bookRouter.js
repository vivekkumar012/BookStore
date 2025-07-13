import express from 'express'
import { getBook } from '../controller/bookController.js';

const bookRouter = express.Router();

bookRouter.get("/", getBook);

export default bookRouter;