import {initTRPC, TRPCError} from '@trpc/server'
import { Context } from './context';
import { prisma } from './prismaClient';
import { Role } from '@prisma/client';

export const trpc =  initTRPC.context<Context>().create(); 

export const protectedProcedure = trpc.procedure.use(
  trpc.middleware(({ ctx, next }) => {
    console.log("userId",ctx.userId)
    if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({ ctx });
  })
);

export const adminProcedure = protectedProcedure.use(
  trpc.middleware(async ({ ctx, next }) => {
    if (ctx.userId){
    const userRole = await prisma.user.findUnique({
      where: { id: ctx.userId },
      select: { role: true }
    });
    if (!userRole || userRole.role !== Role.ADMIN) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({ ctx });
  }
    throw new TRPCError({ code: "UNAUTHORIZED"});
  })
);

