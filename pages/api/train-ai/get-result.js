import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();
import brain from 'brain.js'
const network = new brain.NeuralNetwork()
const { NeuralNetwork } = require('@nlpjs/neural');

export default async function handler(req, res) {
    let { q, id } = req.query

    console.log(q)
    if (!q || !id) return res.status(401).send(401)
    let data = await prisma.trainAi.findUnique({
        where: {
            id: id,
        }
    })

    // network.fromJSON(data?.result)
    // let result = network.run({ q: 1 })

    let net = new NeuralNetwork({ log: true });
    net.fromJSON(data.result);

    let lsq = q.split(" ")
    let result = {}
    for (let itm of lsq) {
        result[itm] = 1
    }

    res.status(200).send(net.run(result))

}