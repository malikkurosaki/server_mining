// import { Server } from 'socket.io'

// function socketHandler (req, res) {
//     console.log("akses socket")
//     if (res.socket.server.io) {
//         console.log('Socket is already running')
//     } else {
//         console.log('Socket is initializing')
//         const io = new Server(res.socket.server)
//         res.socket.server.io = io

//         io.on('connection', socket => {
//             socket.on('input-change', msg => {
//                 socket.broadcast.emit('update-input', msg)
//             })
//         })
//     }
//     res.end()
// }

// export default socketHandler

import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../types/next";
import { Server as ServerIO } from "socket.io";
import { Server as NetServer } from "http";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("New Socket.io server...");
    // adapt Next's net Server to http Server
    const httpServer: NetServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
    });
    // append SocketIO server to Next.js socket server response
    res.socket.server.io = io;
  }
  console.log("socket already")
  res.end();
};
