import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import ServerHeader from "./ServerHeader";
import { redirect } from "next/navigation";

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

    if(!server){
      return redirect("/")
    }

    const role = server.members.find((member) => member.profileId === profile.id)?.role;
    return (  <>
    <div className="flex flex-col h-full text-primary w-full   dark:bg-[#1b1a1a] bg-[#ebecee]">
         <ServerHeader 
          server={server}
          role={role}
         />
    </div>
    </>);
}
 
export default ServerSidebar;