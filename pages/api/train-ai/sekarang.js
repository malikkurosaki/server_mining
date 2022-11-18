import brain from 'brain.js';
import moment from 'moment';
import { NextApiRequest, NextApiResponse } from 'next';
import uuid from 'react-uuid';
const handler = require('express-async-handler')
const network = new brain.NeuralNetwork({ hiddenLayers: [3] })
const { NeuralNetwork } = require('@nlpjs/neural');


export default handler(async (req, res) => {
    if (req.method == "POST") {
        const body = JSON.parse(req.body)

        // network.train(body.data, {
        //     log: true,
        //     iterations: Number(body.iteration)
        // })

        // const dataResult = network.toJSON();

        const net = new NeuralNetwork({ log: true, iterations: Number(body.iteration) });
        net.train(body.data);

        let saveJson = await prisma?.trainAi.create({
            data: {
                id: uuid(),
                name: moment(Date.now()).format('YYYY-MM-DD'),
                content: body.data,
                result: net.toJSON(),
                suggest: body.suggest,
                iteration: body.iteration
            }
        })

        res.status(200).send(saveJson?.id)

    } else {
        res.status(404).send(404)
    }
})
