import { NextApiRequest, NextApiResponse } from "next";
const handler = require('express-async-handler');

export default handler(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const id: any = req.query.id;
        const { name } = JSON.parse(req.body)

        if (!id || !name) res.status(404).send(404)

        await prisma?.trainAi.update({
            where: {
                id: id
            },
            data: {
                name: name
            }
        })

        res.status(200).send("success")

    } else {
        res.status(401).send(401)
    }
})