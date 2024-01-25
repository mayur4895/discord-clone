import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole } from "@prisma/client";
import ServerHeader from "./ServerHeader";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";


interface ServerSidebarProps {
    serverId:string
}






 
export const ServerSidebar = async ({
    serverId
  }: ServerSidebarProps) => {
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }
    
 
    
const iconMap = {
  [ChannelType.TEXT]: <Hash className="h-4 w-4 mt-2"/>,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 mt-2"/>,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 mt-2"/>
  
}


const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4 mr-2 text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4 mr-2 text-rose-500" />
}


    const server = await db.server.findUnique({
        where: {
          id:serverId
        },
        include: {
          channels: {
            orderBy: {
              createdAt: "asc",
            },
          },
          members: {
            include: {
              profile: true,
            },
            orderBy: {
              role: "asc",
            }
          }
        }
      });

    const textChannels =   server?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const  videoChannels = server?.channels.filter((channel) => channel.type === ChannelType.VIDEO)
    const audioChannels = server?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const members = server?.members.filter((member)=> member.profileId !== profile.id)

    if(!server){
      return redirect("/")
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return (  <>
    <div className="flex flex-col h-full text-primary w-full   dark:bg-[#1b1a1a] border-r  bg-[#f2f2f2] ">
         <ServerHeader 
          server={server}
          role={role}
         />
         <ScrollArea className="mx-2">
          <ServerSearch  data={[
              {
                label: "Text Channels",
                type: "channel",
                data: textChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Voice Channels",
                type: "channel",
                data: audioChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Video Channels",
                type: "channel",
                data: videoChannels?.map((channel) => ({
                  id: channel.id,
                  name: channel.name,
                  icon: iconMap[channel.type],
                }))
              },
              {
                label: "Members",
                type: "member",
                data: members?.map((member) => ({
                  id: member.id,
                  name: member.profile.name,
                  icon: roleIconMap[member.role],
                }))
              },
            ]}/>
         </ScrollArea>
    </div>
    </>);
}
 
export default ServerSidebar;