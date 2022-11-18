import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "DELETE") {
        const id: any = req.query.id;
        if (!id) return res.status(401).send(401)
        await prisma?.trainAi.delete({
            where: {
                id: id
            }
        })

        res.status(200).send("success")
    }else{
        res.status(400).send(400)
    }
}