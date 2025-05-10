import express, { Application, NextFunction, Request, Response } from 'express'
import * as trpcExpress from '@trpc/server/adapters/express'
import { appRouter } from './router'
import cors from 'cors'
import {createContext} from './lib/context'
import cookieParser from 'cookie-parser';


const app: Application = express()

app.use(cors(
  {
    origin: 'http://localhost:5173', 
    credentials: true,               
  }
))

app.use(cookieParser());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext, 
  })
)


const PORT: number = Number(process.env.PORT) || 3000
app.listen(PORT, () => {
  console.log(`🚀 Server running on Port: ${PORT}`)
})


