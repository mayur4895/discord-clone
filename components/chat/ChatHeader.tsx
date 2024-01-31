import { ChannelType } from "@prisma/client";
import { Hash, MenuIcon, Mic, Video, icons } from "lucide-react";
import MobileToggle from "../MobileToggel";


interface ChatHeaderProps{
    serverId:string
    name:string
    type: "channel" | "conversation"
 
}

const ChatHeader = ({
    serverId,
    name,
    type,
 
}:ChatHeaderProps) => {

 
    return (  <>
       <div className=" border-b h-12 px-2 flex items-center gap-4">
         
          <MobileToggle serverId={serverId}/>
          <h1 className="flex gap-1 items-center"> 
            {type == "channel" &&(
                  <Hash size={18}/>
            )}
            {name}
            </h1>
       </div>js
    </>);
}
 
export default ChatHeader;