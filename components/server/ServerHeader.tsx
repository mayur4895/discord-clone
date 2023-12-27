import { MemberRole } from "@prisma/client";
import  {ServerWithMembersWithProfiles} from '../../types';



import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
  





interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole;
}
 
const ServerHeader:React.FC<ServerHeaderProps> = ({ 
    server,
    role,
}) => {

 const  isAdmin =  role === MemberRole.ADMIN;
 const isModerator = isAdmin || MemberRole.MODERATOR

    return ( <>
    <DropdownMenu >
  <DropdownMenuTrigger className=" focus:outline-none " asChild>
    <DropdownMenuLabel className="w-56 bg-[#ffff]  text-black dark:text-white hover:dark:bg-black dark:bg-zinc-950 border-b-2   m-2 p-[10px] rounded-sm px-3 flex flex-row justify-between">
        {server.name}
        <ChevronDown size={20}/>
        </DropdownMenuLabel>
            
  </DropdownMenuTrigger>
  <DropdownMenuContent          className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
  
          {isModerator && (
   <DropdownMenuItem className="flex justify-between  text-zinc-900 dark:text-indigo-400  hover:text-indigo-400">
             Invite People
            <UserPlus size={18}/>
         </DropdownMenuItem>
     )}
        {isAdmin && (
         <DropdownMenuItem className="flex justify-between  text-zinc-900 dark:text-indigo-400  hover:text-indigo-400">
            Manage Members
            <Users size={18}/>
         </DropdownMenuItem>
     )}

{isModerator && (
 <DropdownMenuItem className="flex justify-between  text-zinc-900 dark:text-indigo-400  hover:text-indigo-400">
            Create Channel
            <PlusCircle size={18}/>
         </DropdownMenuItem>
     )}

{isAdmin && (
         <DropdownMenuItem className="flex justify-between  text-zinc-900 dark:text-indigo-400  hover:text-indigo-400">
             Server Setting
            <Settings size={18}/>
         </DropdownMenuItem>
     )}


 
          {!isAdmin && (
         <DropdownMenuItem className="flex justify-between">
            Leave Server
            <LogOut size={18}/>
         </DropdownMenuItem>
     )}
    <DropdownMenuSeparator />
    {isAdmin && (
         <DropdownMenuItem className="flex justify-between text-rose-500  hover:text-rose-500">
            delete Server
            <Trash size={18}/>
         </DropdownMenuItem>
     )}
     
  </DropdownMenuContent>
</DropdownMenu>

   
    </> );
}
 
export default ServerHeader;