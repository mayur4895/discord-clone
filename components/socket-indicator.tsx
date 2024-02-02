'use client';

import { useSocket } from "./providers/socket-provider";
import { Badge } from "@/components/ui/badge"


export const SocketIndicator = ()=>{
    const {isConnected} = useSocket();


    if(!isConnected){
        return(
            <Badge variant="outline" className="ml-auto bg-red-500">offline</Badge>

        )
    }

    return(
        <Badge variant="outline" className="ml-auto bg-green-500">Online</Badge>

    )
}