'use client'

import { Member, MemberRole, Profile, Server } from "@prisma/client"
import ActionToolTip from "../ActionToolTip"
import { cn } from "@/lib/utils"
import { ServerWithMembersWithProfiles } from "@/types"
import { ShieldAlertIcon, ShieldCheck } from "lucide-react"

interface ServerMemberProps{
    member: Member & { profile: Profile };
    server: Server;
}

const ServerMember = ({server,member}:ServerMemberProps)=>{
    return(<>
      <button
  
  className={cn(
    "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
     
  )}
>
 
  <p className={cn(
    "line-clamp-1 font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
     
  )}>
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