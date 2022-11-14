import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from '../../../types/next'
import brain from 'brain.js';
const network = new brain.recurrent.LSTM()

export default function handler(req: NextApiRequest, res: NextApiResponseServerIO) {
   
    if (req.method == "POST") {
        const list = JSON.parse(req.body)
        network.train(list, {
            log: true,
            callback: (data) => {

            },
            iterations: 10
        })
        res.socket.server.io.emit('progress-finish', "data")
        res.status(200).send("success")
    } else {
        res.status(404).send(404)
    }
}
