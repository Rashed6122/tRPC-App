import {protectedProcedure} from "../../lib/trpc"
import { idSchema } from "../../schemas/todo"
import { categories } from "../../services/category"


export const getAll= protectedProcedure
.input(idSchema)
.query(async({input})=>{
    const data = await categories(input.id)
    return data
})