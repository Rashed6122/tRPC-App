import { prisma } from "../lib/prismaClient";

export const categories = async(id : string) =>{ 
    const categories = await prisma.category.findMany({
        select: {
            id: true,
            name: true,
        },
        where: {
            OR:[
                {users:{
                    some:{
                            userId: id,
                    }
                }},
                {users:{
                    none:{}}
                },
            ]
        },
    })
    return categories
}