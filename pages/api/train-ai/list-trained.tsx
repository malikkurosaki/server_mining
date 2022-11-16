import { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = await prisma?.trainAi.findMany({
        orderBy: {
            createdAt: "asc"
        },
        select: {
            id: true,
            result: true,
            suggest: true,
            name: true,
            content: true,
            iteration: true
        }
    })
    res.status(200).json(data)
}
