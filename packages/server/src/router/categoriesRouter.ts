import { prisma } from "../lib/prismaClient";
import trpc from "../lib/trpc";

const categoriesRouter = trpc.router(
    {
        getAll: trpc.procedure.query(async()=>{
            const categories = await prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                },
            })
            return categories
        }),
    }
);

export default categoriesRouter;