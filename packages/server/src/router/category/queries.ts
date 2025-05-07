import trpc from "../../lib/trpc"
import { idSchema } from "../../schemas/todo"
import { categories } from "../../services/category"


export const getAll= trpc.procedure
.input(idSchema)
.query(async({input})=>{
    const data = await categories(input.id)
    return data
})