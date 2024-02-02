'use client'

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import ActionToolTip from "../ActionToolTip"
import { cn } from "@/lib/utils"
import { ServerWithMembersWithProfiles } from "@/types"
import { ShieldAlertIcon, ShieldCheck } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
 
import { useParams, useRouter } from "next/navigation"

interface ServerMemberProps{
    member: Member & { profile: Profile };
    server: Server;
}

const ServerMember = ({server,member}:ServerMemberProps)=>{

const router = useRouter();
const params = useParams();
  
  


const onClick = (e:React.MouseEvent)=>{
  e.stopPropagation();
  router.push(`/servers/${params?.serverId}/conversations/${member.id}`)
}

    return(<>
      <button
  onClick={onClick}
  className={cn(
    "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
     
  )}
>
 
  <p className={cn(
    "line-clamp-1 font-semibold text-sm flex items-center gap-2 text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
     
  )}>
   <Avatar className="h-8 w-8">
  <AvatarImage src={member.profile.imageUrl} />
  <AvatarFallback>?</AvatarFallback>
</Avatar>

    {member.profile.name}
  </p>
          
      {
        member.role === MemberRole.ADMIN && (
            <ShieldAlertIcon className="ml-auto text-rose-500" size={15}/>
        )
      }  

{
        member.role === MemberRole.MODERATOR && (
            <ShieldCheck className="ml-auto  text-blue-500" size={15}/>
        )
      }  


    </button>
    </>)
}


export default ServerMember;