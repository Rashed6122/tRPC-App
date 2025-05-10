import {initTRPC, TRPCError} from '@trpc/server'
import { Context } from './context';

export const trpc =  initTRPC.context<Context>().create(); 

export const protectedProcedure = trpc.procedure.use(
  trpc.middleware(({ ctx, next }) => {
    console.log("userId",ctx.userId)
    if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" });
    return next({ ctx });
  })
);

