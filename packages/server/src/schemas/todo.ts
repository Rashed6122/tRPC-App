import { z } from "zod";


export const idSchema = z.object({ id: z.string() });
export const createSchema = z.object({
      id: z.string().cuid2().optional(),
      title: z.string().min(3),
      pinned: z.boolean(),
      categoryId: z.string(),
      subTasks: z.array(z.object({ item: z.string().min(3) })).optional(),
      userId : z.string().cuid2(),
      ownerId: z.string().cuid2().optional(),
    });

export const updateSchema = z.object({
      id: z.string(),
      isCompleted: z.boolean(),
      pinned: z.boolean(),
      subTasks: z.array(z.object({ item: z.string().min(3) })).optional(),
    })
export const optionalIdSchema = z.object({
      id: z.string().optional()})
export const loginSchema = z.object({
      email: z.string().email(),
      password: z.string(),
    });
export const registerSchema = z.object({
      name: z.string().min(3, { message: "Name must be at least 3" }),
      email: z.string().email({ message: "Invalid email address" }),
      age: z.number().positive({ message: "Age must be at least 1" }),
      phone: z.string().min(10, {
        message: "Phone number must be at least 10 digits",
      }),
      password: z.string().min(6, { message: "Password must be at least 6" }),
    });

