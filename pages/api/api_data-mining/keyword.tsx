import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const apiKeyword = async (req: NextApiRequest, res: NextApiResponse) => {
    const data = await new PrismaClient().keyword.findMany()

    res.status(200).json(data)
}

export default apiKeyword;