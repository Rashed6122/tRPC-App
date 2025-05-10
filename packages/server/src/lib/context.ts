import { inferAsyncReturnType } from '@trpc/server';
import { verifyAccessToken } from './tokens';
import { type CreateExpressContextOptions } from '@trpc/server/adapters/express';

export const createContext = async ({ req , res }: CreateExpressContextOptions) => {
  const accessToken = req.cookies['access_token'];
  try {
    const payload = accessToken ? verifyAccessToken(accessToken) : null;
    return { req , res,  userId: payload?.userId ?? null };
  } catch {
    return { req ,  res, userId: null };
  }
};

export type Context = inferAsyncReturnType<typeof createContext>;
