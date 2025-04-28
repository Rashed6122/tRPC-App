import { z } from "zod";


export const idSchema = z.object({ id: z.string() });
export const createSchema = z.object({
      id: z.string().cuid2().optional(),
      title: z.string().min(3),
      pinned: z.boolean(),
      categoryId: z.string(),
      subTasks: z.array(z.object({ item: z.string().min(3) })).optional(),
    });

export const updateSchema = z.object({
      id: z.string(),
      isCompleted: z.boolean(),
      pinned: z.boolean(),
      subTasks: z.array(z.object({ item: z.string().min(3) })).optional(),
    })
export const optionalIdSchema = z.object({
      id: z.string().optional()})