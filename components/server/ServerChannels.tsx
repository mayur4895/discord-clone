'use client'

import { ModalType, useModal } from "@/hooks/use-modal-store";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { Edit, Edit2, Hash, Lock, Mic, Plus, Settings, Trash, Video } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { redirect, useParams, useRouter } from "next/navigation";
import ActionToolTip from "../ActionToolTip";

interface ServerChannels{
    channel:Channel,
    server:Server,
    role?:MemberRole,


}

const IconMap = {
    [ChannelType.TEXT] : Hash,
    [ChannelType.AUDIO]: Mic,
    [ChannelType.VIDEO]: Video,
}
 

 
const ServerChannels = ({channel,server,role}:ServerChannels)=>{
   const params = useParams();
    const {onOpen} = useModal();
    const router = useRouter();

    const Icon = IconMap[channel.type];





    const onClick = ()=>{
      router.push(`/servers/${params?.serverId}/channels/${channel?.id}`)
   }

   

   const onAction = (e:React.MouseEvent,action:ModalType)=>{
     e.stopPropagation();
    onOpen(action,{server,channel});
 }
 
   
    


    return(<>
  <button
         onClick={onClick}
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.channelId === channel.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
    >
      <Icon className="flex-shrink-0 w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p className={cn(
        "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
        params?.channelId === channel.id && "text-primary dark:text-zinc-200 dark:group-hover:text-white"
      )}>
        {channel.name}
      </p>
      {channel.name !== "general" && role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionToolTip label="Edit">
            <Edit
           onClick={(e)=>{onAction(e,"editChannel",)}}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionToolTip>
          <ActionToolTip label="Delete">
            <Trash
              onClick={(e)=>{onAction(e,"deleteChannel")}}
              className="hidden group-hover:block w-4 h-4 text-zinc-500 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-300 transition"
            />
          </ActionToolTip>
        </div>
      )}
      {channel.name === "general" && (
        <Lock
          className="ml-auto w-4 h-4 text-zinc-500 dark:text-zinc-400"
        />
      )}
        
        </button>
    </>)
}
export default ServerChannels;