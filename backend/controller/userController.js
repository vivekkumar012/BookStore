import { z } from 'zod';
import { userModel } from '../models/userModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const signup = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    //zod validation
    const validSchema = z.object({
        firstname: z.string().min(2, {message: "firstname must be more than 2 char"}),
        lastname: z.string().min(2, {message: "Lastname must be more than 2 char long"}),
        email: z.string().email(),
        password: z.string().min(4, {message: "password must be more than 4 char long"})
    })
    const validate = validSchema.safeParse(req.body);
    if(!validate.success) {
        return res.status(401).json({
            message: "Zod validation error"
        })
    }

    try {
        if(!firstname || !lastname || !email || !password) {
            return res.status(400).json({
                message: "All fields are required for signup"
            })
        }
        const user = await userModel.findOne({
            email: email
        })
        if(user) {
            return res.status(401).json({
                message: "User already exist with this mail"
            })
        }
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = await userModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashPass
        })
        res.status(200).json({
            message: "You are Successfully SignedUp",
            newUser
        })
    } catch (error) {
        res.status(402).json({
            message: "Error in signup",
            error: error.message
        })
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body;
    try {
        if(!email || !password) {
            return res.status(400).json({
                message: "All fields are required for signup"
            })
        }
        const user = await userModel.findOne({
            email: email
        })
        if(!user) {
            return res.status(400).json({
                message: "User not exist"
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({
                message: "Password not matched"
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, {expiresIn: "1d"})

        res.status(200).json({
            message: "user signin successfully",
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            message: "Error in signin",
            error: error.message
        })
    }
}