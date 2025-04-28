import { prisma } from "../lib/prismaClient";

export const categories = async() =>{ 
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
    })
    return categories
}