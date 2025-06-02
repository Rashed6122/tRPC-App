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
export const createCategoryService = async(name : string, id : string | null) =>{
    return prisma.userCategories.create({
      data: {
         category: {
            create: {
                name
            }},
        user: {
            connect: {
                id: id ? id : "",
            }
        }
      },    
    });
}

export const createCategoryForAllService = async(name : string) =>{
    return prisma.category.create({
      data: {
       name
      },
    });
}

