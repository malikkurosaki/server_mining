import brain from 'brain.js';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import uuid from 'react-uuid';
const handler = require('express-async-handler')


export default handler(async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method == "POST") {
        const body = JSON.parse(req.body)


        const network = new brain.NeuralNetwork({ hiddenLayers: [3] })
        network.train(body.data, {
            log: true,
            iterations: body.iteration
        })

        const dataResult: any = network.toJSON();
        let saveJson = await prisma?.trainAi.create({
            data: {
                id: uuid(),
                name: moment(Date.now()).format('YYYY-MM-DD'),
                content: body.data,
                result: dataResult,
                suggest: body.suggest,
                iteration: body.iteration
            }
        })

        res.status(200).send(saveJson?.id)

    } else {
        res.status(404).send(404)
    }
})
