import { z } from "zod";
import { prisma } from "../../lib/prismaClient";
import trpc from "../../lib/trpc";

export const allTodos = trpc.procedure.query(async () => {
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
});

export const trash = trpc.procedure.query(async () => {
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
});

const getOneSchema = z.object({ id: z.string() });
export const getOne = trpc.procedure
  .input(getOneSchema)
  .query(async ({ input }) => {
    const todo = await prisma.todo.findUnique({
      where: {
        id: input.id,
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
  });
