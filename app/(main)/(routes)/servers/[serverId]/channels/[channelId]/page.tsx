import ChatHeader from "@/components/chat/ChatHeader";
 
 
 
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatWelcome from "@/components/chat/ChatWelcome";
 
import { ChatInput } from "@/components/chat/ChatInput";
import ChatMessages from "@/components/chat/ChatMessages";
 
 
 

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
     <div className="flex flex-col   h-[100vh] ">

  
      <ChatHeader
      name={channel.name}
      serverId={channel.serverId}
      type="channel"
      />
 
       <ChatMessages
       chatId={channel.id}
       name={channel.name}
       member={member}
       paramKey="channelId"
       paramValue={channel.id}
       type="channel"
       apiUrl="/api/messages"
       socketUrl="/api/socket/messages"
       socketQuery={{
        channelId:channel.id,
        serverId:channel.serverId
       }}
       />
       
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