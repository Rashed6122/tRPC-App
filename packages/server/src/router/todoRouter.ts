import { prisma } from "../lib/prismaClient";
import trpc from "../lib/trpc";
import{ z }from "zod";

const todoRouter = trpc.router(
    {
        allTodos: trpc.procedure.query(async()=>{
            const todos = await prisma.todo.findMany()
            return todos
        }),
        getOne: trpc.procedure
        .input(z.object({id: z.string()}))
        .query(async({input})=>{
            const todo = await prisma.todo.findUnique({
                where: {
                    id : input.id
                }
            })
            return todo
        }),
        create: trpc.procedure
        .input(z.object({title: z.string().min(3)}))
        .mutation(({input})=>{
            const title  = input.title
            return prisma.todo.create({
                data: {
                    title: title,
                    isCompleted: false, 
                }
            })
        }),
        delete: trpc.procedure
        .input(z.object({id: z.string()}))
        .mutation(({input})=>{
            const id  = input.id
            return prisma.todo.delete({
                where: {
                    id : input.id
                }
            })
        }),
        update: trpc.procedure
        .input(z.object({id: z.string() , isCompleted : z.boolean()}))
        .mutation(({input})=>{
            const id  = input.id
            return prisma.todo.update({
                where: {
                    id : input.id
                },
                data:{
                    isCompleted : input.isCompleted
                }
            })
        }),
    }
);

export default todoRouter;