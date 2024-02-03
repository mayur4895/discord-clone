 
import getOrCreateConversation from "@/lib/conversation";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import ChatHeader from "@/components/chat/ChatHeader";

interface MemberIdPageProps{
    params:{
        serverId:string,
        memberId:string
    }
}


const MemberIdPage=async({params}:MemberIdPageProps) => {

const profile = await currentProfile();
if(!profile){
    return redirectToSignIn();
}


const currentMember = await db.member.findFirst({
    where:{
        profileId:profile.id,
        serverId:params.serverId  
    },
    include:{
        profile:true
    }
})


if(!currentMember){
    return redirect(`/`);
}


const  conversation =  await getOrCreateConversation(currentMember.id,params.memberId);

if(!conversation){
    return redirect(`/servers/${params.serverId}`);
}

const {memberOne,memberTwo} = conversation;

const otherMember = memberOne.profileId == profile.id ? memberTwo : memberOne;

 return (<>
  <ChatHeader 
  serverId={otherMember.serverId}
  name={otherMember.profile.name}
  type="conversation"
  imageUrl={otherMember.profile.imageUrl}

  />

 </>);
} 
 
export default MemberIdPage;