import trpc from "../../lib/trpc"
import { categories } from "../../services/category"


export const getAll= trpc.procedure.query(async()=>{
    const data = await categories()
    return data
})