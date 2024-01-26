import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType, MemberRole, Channel } from '@prisma/client';
import ServerHeader from "./ServerHeader";
import { redirect } from "next/navigation";
import { ScrollArea } from "../ui/scroll-area";
import ServerSearch from "./ServerSearch";
import { Hash, Mic, ShieldAlert, ShieldCheck, Video } from "lucide-react";
import { Separator } from "../ui/separator";
import ServerChannels from "./ServerChannels";
import ServerSection from "./ServerSection";


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
  [ChannelType.TEXT]: <Hash className="h-4 w-4 "/>,
  [ChannelType.AUDIO]: <Mic className="h-4 w-4 "/>,
  [ChannelType.VIDEO]: <Video className="h-4 w-4 "/>
  
}


const roleIconMap = {
  [MemberRole.GUEST]: null,
  [MemberRole.MODERATOR]: <ShieldCheck className="h-4 w-4  text-indigo-500" />,
  [MemberRole.ADMIN]: <ShieldAlert className="h-4 w-4  text-rose-500" />
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
              <Separator className="mt-4"/>
         <ScrollArea className="mx-2">
        
           

        <div>
        { !!textChannels?.length &&(
              <ServerSection 
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Text Channels"
              server={server}
              />
            )}
           {
            textChannels?.map((channel)=>{
           return( 
           <ServerChannels
            key={channel?.id}
            role={role}
            server={server}
            channel={channel}
             />)
            })
           }
        </div>
        
        <div>
        { !!audioChannels?.length &&(
              <ServerSection 
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Voice Channels"
              server={server}
              />
            )}
           {
            audioChannels?.map((channel)=>{
           return( 
           <ServerChannels
            key={channel?.id}
            role={role}
            server={server}
            channel={channel}
             />)
            })
           }
        </div>
        
        <div>
        { !!videoChannels?.length &&(
              <ServerSection 
              sectionType="channels"
              channelType={ChannelType.TEXT}
              role={role}
              label="Video Channels"
              server={server}
              />
            )}
           {
            videoChannels?.map((channel)=>{
           return( 
           <ServerChannels
            key={channel?.id}
            role={role}
            server={server}
            channel={channel}
             />)
            })
           }
        </div>
           <Separator/>
        <div>
        { !!members?.length &&(
              <ServerSection 
              sectionType="members" 
              role={role}
              label="Members"
              server={server}
              />
            )}
           {/* {
            members?.map((member)=>{
           return( 
           <ServerMember
            key={member?.id}
            role={role}
            server={server}
            member={member}
             />)
            })
           } */}
        </div>
         </ScrollArea>
    </div>
    </>);
}
 
export default ServerSidebar;