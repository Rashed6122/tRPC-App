import { z } from "zod";
import { loginSchema, registerSchema } from "../schemas/todo";
import { prisma } from "../lib/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const loginService = async(input: z.infer<typeof loginSchema>) =>{
    const { email , password } = input;
    const SECRET_KEY = 'your_jwt_secret';
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
            },
        };
    }
    else{
        throw new Error("Invalid credentials");
    }
}


export const registerService = async(input: z.infer<typeof registerSchema>) =>{
    const { email, name , password , age , phone } = input;
    const SECRET_KEY = 'your_jwt_secret';
    const user = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (user) {
        throw new Error("User already exists");
    }
    else{
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                age,
                phone,
            },
        });
        const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' });
        return {
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
            },
        };
        
    }
}