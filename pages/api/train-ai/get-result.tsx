import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
import brain from 'brain.js'
const network = new brain.NeuralNetwork()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    let { q, id } = req.query
    
    if (!q || !id) return res.status(401).send(401)
    let data = await prisma.trainAi.findUnique({
        where: {
            id: id as string,
        }
    })
    network.fromJSON(data?.result as any)
    let result = network.run(q)

    res.status(200).send(result)

}