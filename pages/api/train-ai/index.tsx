import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import { ModelTrainAi } from "../../../components/models/model";
import { prisma } from "../../../db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const perPage = 20;
    const p = req.query.p ?? 0;
    let data = await prisma.youtubeContent.findMany({
        select: {
            id: true,
            title: true
        },
        skip: Number(p) * perPage,
        take: perPage
    })

    const listData: ModelTrainAi[] = [];

    for (let e of data) {
        listData.push({
            id: e.id,
            title: e.title,
            selectted: false,
            suggest: ""
        })
    }

    res.status(200).json(listData);
}