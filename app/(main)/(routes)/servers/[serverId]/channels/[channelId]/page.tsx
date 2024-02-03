import ChatHeader from "@/components/chat/ChatHeader";
import ChatInput from "@/components/chat/ChatInput";
 
 
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
     <div className="flex flex-col h-full">

  
      <ChatHeader
      name={channel.name}
      serverId={channel.serverId}
      type="channel"
      />

      <div className=" p-6 pb-6">Future Message...</div>
     
       
      <ChatInput
         type="channel"
         name={channel.name}
         apiUrl="/api/socket/messages"
         query={
          {   channelId:channel.id,
            serverId:channel.serverId}
         }    
        />
      </div>
   
     
     </> );
}
 
export default ChannelIdPAge;