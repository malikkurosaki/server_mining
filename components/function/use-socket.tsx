import { useEffect, useState } from "react";
import io, { Socket } from 'socket.io-client'

export function useSocket() {
    const [soc, setSoc] = useState<Socket>()
    useEffect(() => {
        const socket = io({ path: "/api/socket/io" });
        socket.on("connect", async () => {
            console.log("connected")
        });

        socket.on("disconnect", () => {
            console.log("disconnect")
        });

        socket.on('progress', data => console.log(data))
        setSoc(socket);
        return () => {
            socket.disconnect();
        };
    }, []);
    return soc
}