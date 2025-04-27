import { z } from "zod";
import { prisma } from "../../lib/prismaClient";
import trpc from "../../lib/trpc";

export const create = trpc.procedure
  .input(
    z.object({
      id: z.string().cuid2().optional(),
      title: z.string().min(3),
      pinned: z.boolean(),
      categoryId: z.string(),
      subTasks: z.array(z.object({ item: z.string().min(3) })).optional(),
    }),
  )
  .mutation(({ input }) => {
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
        pinned: true,
        categoryId: true,
      },
    });
  });
export const deleteTodo = trpc.procedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const id = input.id;
    return prisma.todo.update({
      where: {
        id: input.id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  });
export const destory = trpc.procedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const id = input.id;
    return prisma.todo.delete({
      where: {
        id: input.id,
      },
    });
  });
export const restore = trpc.procedure
  .input(z.object({ id: z.string() }))
  .mutation(({ input }) => {
    const id = input.id;
    return prisma.todo.update({
      where: {
        id: input.id,
      },
      data: {
        deletedAt: null,
      },
    });
  });

export const update = trpc.procedure
  .input(
    z.object({
      id: z.string(),
      isCompleted: z.boolean(),
      pinned: z.boolean(),
      subTasks: z.array(z.object({ item: z.string().min(3) })).optional(),
    }),
  )
  .mutation(({ input }) => {
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
  });
