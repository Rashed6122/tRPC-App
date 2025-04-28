import { z } from "zod";
import { prisma } from "../lib/prismaClient";
import { createSchema, updateSchema } from "../schemas/todo";

// Query functions
// These functions are responsible for fetching data from the database

/** 
 *  This function fetches all todos from the database that are not deleted. 
 */
export const todosService = async() =>{ 
    const todos = await prisma.todo.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      title: true,
      isCompleted: true,
      categoryId: true,
      createdAt: true,
      pinned: true,
      subTasks: {
        select: {
          item: true,
        },
      },
    },
  });
  return todos;
}

/** 
 *  This function fetches all todos from the database that are deleted. 
 */
export const trashService = async() =>{
    const todos = await prisma.todo.findMany({
        where: {
          deletedAt: {
            not: null,
          },
        },
        select: {
          id: true,
          title: true,
          isCompleted: true,
          categoryId: true,
          createdAt: true,
          pinned: true,
          subTasks: {
            select: {
              item: true,
            },
          },
        },
      });
    return todos;
};

/** 
 *  This function fetches a single todo from the database by its ID. 
 */
export const getOneService = async(id: string) =>{
    const todo = await prisma.todo.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          isCompleted: true,
          createdAt: true,
          subTasks: {
            select: {
              item: true,
            },
          },
        },
      });
      return todo;
};

// Mutation functions
// These functions are responsible for modifying data in the database

/** 
 *  This function creates a new todo in the database. 
 */
export const createService = async(input: z.infer<typeof createSchema>) =>{
    const { id, title, categoryId, pinned } = input;
    return prisma.todo.create({
      data: {
        id,
        title,
        isCompleted: false,
        pinned,
        categoryId,
        subTasks: {
          create: input.subTasks?.map((subTask) => ({
            item: subTask.item,
          })),
        },
      },
    });
}

/** 
 *  This function deletes a todo from the database by marking it as deleted. 
 */
export const deleteService = async(id: string)=>{
    return prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
}

/** 
 *  This function permanently deletes a todo from the database. 
 */
export const destoryService = async(id: string)=>{
    return prisma.todo.delete({
        where: {
          id: id,
        },
      });
}

/** 
 *  This function restores a deleted todo in the database. 
 */
export const restoreService = async(id: string)=>{
    return prisma.todo.update({
        where: {
          id: id,
        },
        data: {
          deletedAt: null,
        },
      });
}

/** 
 *  This function updates a todo in the database. 
 */
export const updateService = async(input: z.infer<typeof updateSchema>) =>{
    return prisma.todo.update({
        where: {
          id: input.id,
        },
        data: {
          isCompleted: input.isCompleted,
          pinned: input.pinned,
          ...(input.subTasks
            ? {
                subTasks: {
                  create: input.subTasks?.map((subTask) => ({
                    item: subTask.item,
                  })),
                },
              }
            : {}),
        },
        include: {
          subTasks: true,
        },
      });
}
