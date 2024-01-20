'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
  import { HiDotsVertical } from "react-icons/hi";
 

 
import * as z from "zod"
 
 
 
import {  useToast } from "../ui/use-toast"
 import axios from "axios"  
import {  useRouter } from "next/navigation"
import { useModal } from '../../hooks/use-modal-store';
import Image from "next/image"
 
import { ServerWithMembersWithProfiles } from "@/types"
import { ScrollArea } from "../ui/scroll-area"
import MemberAvatar from "../MemberAvtar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import qs from "query-string"
import { Separator } from "../ui/separator";
import {   Loader2, ShieldAlert, ShieldCheck, UserPlus,   } from "lucide-react";
import { useState } from "react";
import { DropdownMenuGroup, DropdownMenuSub } from "@radix-ui/react-dropdown-menu";
import { BsShieldCheck ,BsShield  } from "react-icons/bs";
import { AiTwotonePushpin } from "react-icons/ai";
import { GoCheck } from "react-icons/go";
import { MemberRole } from "@prisma/client";
 

const RoleIconMap:any = {
  "GUEST":null,
  "ADMIN":<ShieldAlert size={18} className="text-red-500"/>,
  "MODERATOR":<ShieldCheck  size={18} className="text-blue-500"/>
}

const MangaeMembersModal = ()=>{
  const {onOpen, isOpen,onClose,type ,data} = useModal();


  const [lodingId,setlodingId] = useState("");

  const isModalOpen = isOpen && type==="members";
const {toast} = useToast();
 const router = useRouter();
  const {server} = data as {server:ServerWithMembersWithProfiles};
  
  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
       setlodingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: {
          serverId: server?.id,
        }
      });

      const response = await axios.patch(url, { role });

      router.refresh();
      onOpen("members", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setlodingId("");
    }
  }
 
 
 const handleClose = ()=>{             
 
  onClose();
 }
 
    return(<>
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
  <DialogContent className=" outline-none">
    <DialogHeader>
      <DialogTitle className="text-2xl">Manage Server Members</DialogTitle>
      <DialogDescription>
        You can manage the server members.
      </DialogDescription>
    </DialogHeader>
    <ScrollArea className="mt-8 max-h-[420px] pr-6">
         {server?.members?.map((member:any)=>{
          return( 
    
        
              
       <div>
             <div className="flex justify-between ">   
       <div className="flex gap-3 items-center">
 
     <MemberAvatar    imageUrl={member?.profile?.imageUrl}    />
      
   
           <div>
           <span className="text-medium flex justify-start gap-4 items-center">{member?.profile?.name} {RoleIconMap[member?.role]}</span>
           <p className="text-sm text-gray-400">{member?.profile.email}</p>
           </div>
          </div>
  {server.profileId !== member?.profileId &&  lodingId !== member.id &&
      (   <DropdownMenu>
        <DropdownMenuTrigger className=" outline-none"><HiDotsVertical size={22}/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
     
 
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>Role</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
              
              <DropdownMenuItem className="flex gap-3 items-center"
                onClick={()=>{onRoleChange(member?.id, "GUEST") }}
                > 
           <div className="flex items-center">
                <BsShield className="mr-2 h-4 w-4" />
                  <span>Guest</span>
                </div>
                  {member?.role == "GUEST" && (
             <GoCheck className="ml-auto"/>
                  )} 
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="flex gap-3 items-center"
                   onClick={()=>{onRoleChange(member?.id, "MODERATOR")}}>
               <div className="flex items-center">
               <BsShieldCheck className="mr-2 h-4 w-4" />
                  <span>Moderator</span>
               </div>
                  {member?.role == "MODERATOR" && (
             <GoCheck className="ml-auto "/>
                  )} 
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <AiTwotonePushpin className="mr-2 h-4 w-4" />
            <span>Kick</span>
     
          </DropdownMenuItem>
        
         

        
          
        </DropdownMenuContent>
      </DropdownMenu>
      )  
      }

      {
          lodingId === member.id &&  (
            <Loader2  className=" animate-spin ml-auto mt-auto mb-auto text-zinc-600"/>
          )
      }
       </div>
       <Separator className="my-4 opacity-25"/> 
            </div>
              

      
          )
         })}
               </ScrollArea> 
  </DialogContent>
 
</Dialog>

    </>) 
}


export default MangaeMembersModal;