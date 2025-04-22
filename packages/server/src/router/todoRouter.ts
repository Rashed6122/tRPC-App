import { prisma } from "../lib/prismaClient";
import trpc from "../lib/trpc";
import{ z }from "zod";

const todoRouter = trpc.router(
    {
        allTodos: trpc.procedure.query(async()=>{
            const todos = await prisma.todo.findMany({
                select: {
                    id: true,
                    title: true,
                    isCompleted: true,
                    categoryId: true,
                    createdAt: true,
                    pinned: true,
                    subTasks :{
                        select: {
                            item: true,
                        }
                    }
                },
            })
            return todos
        }),
        
        getAllCategories: trpc.procedure.query(async()=>{
            const categories = await prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                    todos: {
                        select: {
                            id: true,
                            title: true,
                            isCompleted: true,
                            createdAt: true,
                            subTasks :{
                                select: {
                                    item: true,
                                }
                            }
                        },
                    },
                },
            })
            return categories
        }),
        getOne: trpc.procedure
        .input(z.object({id: z.string()}))
        .query(async({input})=>{
            const todo = await prisma.todo.findUnique({
                where: {
                    id : input.id
                },
                select: {
                    id: true,
                    title: true,
                    isCompleted: true,
                    createdAt: true,
                    subTasks: {
                        select: {
                            item: true,
                        }
                    }
                },
            })
            return todo
        }),
        create: trpc.procedure
        .input(z.object({title: z.string().min(3) , pinned : z.boolean(), categoryId: z.string(), subTasks: z.array(z.object({item: z.string().min(3)})).optional()}))
        .mutation(({input})=>{
            const title  = input.title
            const pinned = input.pinned
            return prisma.todo.create({
                data: {
                    title: title,
                    isCompleted: false, 
                    pinned: pinned,
                    categoryId: input.categoryId,
                    subTasks: {
                        create: input.subTasks?.map((subTask) => ({
                            item: subTask.item,
                        })),
                    },  
                },
                select: {
                    id: true,
                    title: true,
                    isCompleted: true,
                    createdAt: true,
                    subTasks: {
                        select: {
                            item: true,
                        }
                    },
                    pinned: true,
                    categoryId: true,
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
        .input(z.object({id: z.string() , isCompleted : z.boolean() ,pinned : z.boolean() ,subTasks: z.array(z.object({item: z.string().min(3)})).optional()}))
        .mutation(({input})=>{
            if (input.subTasks){
                return prisma.todo.update({
                    where: {
                        id : input.id
                    },
                    data:{
                        isCompleted : input.isCompleted,
                        pinned: input.pinned,
                        subTasks: {
                            create: input.subTasks?.map((subTask) => ({
                                item: subTask.item,
                            })),
                    }},
                    include: {
                        subTasks : true,
                    },
                })
            }
            return prisma.todo.update({
                where: {
                    id : input.id
                },
                data:{
                    pinned: input.pinned,
                    isCompleted : input.isCompleted,
                },
            })
        }),
    }
);

export default todoRouter;