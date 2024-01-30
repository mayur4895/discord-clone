import ChatHeader from "@/components/chat/ChatHeader";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ChannelIdPageProps{
    params:{
        channelId:string,
        serverId:string
    }
}

const ChannelIdPAge = async({params}:ChannelIdPageProps) => {
    
    const profile = await currentProfile();
       
    if(!profile){
        return redirectToSignIn();
    }

    const channel =  await db.channel.findUnique({
        where:{
            id:params?.channelId,
  
        }
    })


    const member = await db.member.findFirst({
        where:{
            serverId:params?.serverId,
            profileId:profile?.id
             
        }
    })

    if (!channel || !member) {
        redirect("/");
      }
    
     return ( <> 
      <ChatHeader
      name={channel.name}
      serverId={channel.serverId}
      type="channel"
      
      />
     </> );
}
 
export default ChannelIdPAge;