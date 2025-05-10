import { TRPCError } from "@trpc/server";
import { prisma } from "../../lib/prismaClient";
import { createTokens, verifyRefreshToken } from "../../lib/tokens";
import {protectedProcedure, trpc} from "../../lib/trpc";
import {loginSchema , registerSchema} from "../../schemas/todo";
import { loginService, registerService } from "../../services/auth";
import bcrypt from "bcryptjs";


export const login = trpc.procedure
  .input(
    loginSchema
  )
  .mutation(async({ input , ctx }) => {
    // const data = loginService(input )
    // return data;
    
    const { email , password } = input;
    const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    if (user && await bcrypt.compare(password, user.password)) {
      const { accessToken, refreshToken } = createTokens(user.id);
      
      ctx.res.setHeader('Set-Cookie', [
        `access_token=${accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=900`,
        `refresh_token=${refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=604800`,
      ]);
            return {
                accessToken,
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
  });

export const refresh =  trpc.procedure.mutation(({ ctx }) => {
    const refreshToken = ctx.req.cookies['refresh_token'];
    if (!refreshToken) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    try {
      const { userId } = verifyRefreshToken(refreshToken);
      const { accessToken } = createTokens(userId);

      ctx.res.setHeader('Set-Cookie', [
        `access_token=${accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict; Max-Age=900`,
      ]);

      return { message: 'Token refreshed' };
    } catch {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }
  });

export const me =  protectedProcedure
.query(({ ctx }) => {
    return { userId: ctx.userId }; 
  });

export const logout = trpc.procedure.mutation(({ ctx }) => {
    ctx.res.clearCookie("access_token");
    return { success: true };
  })

export const register = trpc.procedure
    .input(
        registerSchema
    )
    .mutation(({ input }) => {
        const data = registerService(input)
        return data;
    });

