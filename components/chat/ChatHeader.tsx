import { ChannelType } from "@prisma/client";
import { Hash, MenuIcon, Mic, Video, icons } from "lucide-react";
import MobileToggle from "../MobileToggel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


interface ChatHeaderProps{
    serverId:string
    name:string
    type: "channel" | "conversation"
    imageUrl?:string;
 
}

const ChatHeader = ({
    serverId,
    name,
    type,
    imageUrl
 
}:ChatHeaderProps) => {

 
    return (  <>
       <div className=" border-b h-12 px-2 flex items-center gap-4">
         
          <MobileToggle serverId={serverId}/>
          <h1 className="flex gap-1 items-center"> 
            {type == "channel" &&(
                  <Hash size={18}/>
            )}

{type === "conversation" && (
    <Avatar className="h-8 w-8">
    <AvatarImage src={imageUrl} />
    <AvatarFallback>?</AvatarFallback>
  </Avatar>
      )}
            {name}
            </h1>
       </div>
    </>);
}
 
export default ChatHeader;