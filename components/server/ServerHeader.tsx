'use client'
import { MemberRole } from "@prisma/client";
import  {ServerWithMembersWithProfiles} from '../../types';
import qs from "query-string";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "../ui/button";
import { ChevronDown, LogOut, PlusCircle, Settings, Trash, UserPlus, Users } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
  





interface ServerHeaderProps {
    server: ServerWithMembersWithProfiles,
    role?: MemberRole;
}
 
const ServerHeader:React.FC<ServerHeaderProps> = ({ 
    server,
    role,
}) => {


  const [IsOpen,setIsOpen]= useState(false);
 const [IsContinue,setIsContinue]= useState(false);
    const { onOpen } = useModal();

 const  isAdmin =  role === MemberRole.ADMIN;
 const isModerator = isAdmin || MemberRole.MODERATOR
const router = useRouter();


 
 const  onDelete = async (serverId:string) => {
    try {


            if(IsContinue){
                    
      const url = qs.stringifyUrl({
        url: `/api/servers/${serverId}/leave`,
        
      });
    
      const response = await axios.delete(url);
       router.refresh();
       return response.data;
            }
   
    } catch (error) {
      console.log(error);
    }  
  }
  
  
  

    return ( <>
    <DropdownMenu >
  <DropdownMenuTrigger className=" focus:outline-none " asChild>
    <DropdownMenuLabel className="w-56 bg-[#ffff]  transition text-zinc-800 dark:text-white cursor-pointer dark:bg-zinc-800  border-[1px] border-zinc-200  dark:border-zinc-700  m-2 p-[10px] rounded-sm px-3 flex flex-row justify-between">
        {server.name}
        <ChevronDown size={20}/>
        </DropdownMenuLabel>
            
  </DropdownMenuTrigger>
  <DropdownMenuContent          className="w-56 text-xs font-medium text-black dark:text-neutral-400 space-y-[2px]">
  
          {isModerator && (
   <DropdownMenuItem
   onClick={()=>onOpen("invite",{server})}
   
   className="flex justify-between  text-indigo-500 dark:text-indigo-400  hover:text-zinc-200">
             Invite People
            <UserPlus size={18}/>
         </DropdownMenuItem>
     )}
        {isAdmin && (
         <DropdownMenuItem
         onClick={()=>onOpen("members",{server})}
          className="flex justify-between  text-zinc-900  dark:text-zinc-200  hover:text-zinc-200">
            Manage Members
            <Users size={18}/>
         </DropdownMenuItem>
     )}

{isModerator && (
 <DropdownMenuItem 
 onClick={()=>onOpen("createChannel",{server})}
 className="flex justify-between  text-zinc-900 dark:text-zinc-200  hover:text-zinc-200">
            Create Channel
            <PlusCircle size={18}/>
         </DropdownMenuItem>
     )}

{isAdmin && (
         <DropdownMenuItem 
         onClick={()=>onOpen("editServer",{server})}
         className="flex justify-between  text-zinc-900 dark:text-zinc-200  hover:text-zinc-200">
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
         <DropdownMenuItem className="flex justify-between text-rose-500  hover:text-rose-500" onClick={()=>{onDelete(server?.id) , setIsOpen(true)}}>
            delete Server
            <Trash size={18}/>
         </DropdownMenuItem>
     )}
     
  </DropdownMenuContent>
</DropdownMenu>

   <AlertDialog open={IsOpen} onOpenChange={setIsOpen}>
  <AlertDialogTrigger></AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter className="flex items-center">
      <AlertDialogCancel onClick={()=>{setIsContinue(false) , setIsOpen(false)}} >Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>{setIsContinue(true) , setIsOpen(false)}}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </> );
}
 
export default ServerHeader;