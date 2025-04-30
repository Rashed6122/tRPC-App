import trpc from "../../lib/trpc";
import {loginSchema , registerSchema} from "../../schemas/todo";
import { loginService, registerService } from "../../services/auth";

export const login = trpc.procedure
  .input(
    loginSchema
  )
  .mutation(({ input }) => {
    const data = loginService(input)
    return data;
  });

export const register = trpc.procedure
    .input(
        registerSchema
    )
    .mutation(({ input }) => {
        const data = registerService(input)
        return data;
    });

