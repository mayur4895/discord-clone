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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import FileUplod from "../FileUplod"
import {  useToast } from "../ui/use-toast"
 import axios from "axios"  
import {  useRouter } from "next/navigation"
import { useModal } from '../../hooks/use-modal-store';
import Image from "next/image"
import { Server } from '@prisma/client';
import { ServerWithMembersWithProfiles } from "@/types"
 



const formSchema = z.object({
    name: z.string().min(2).max(50),
    imageUrl:z.string().min(1,{
        message:"Server image is required"
    })
})

const MangaeMembersModal = ()=>{
  const {isOpen,onClose,type ,data} = useModal();

  const isModalOpen = isOpen && type==="members";
const {toast} = useToast();
 const router = useRouter();
  const {server} = data as {server:ServerWithMembersWithProfiles};
  
   async function onSubmit(values: z.infer<typeof formSchema>) {
      
   try {
     await axios.post(`/api/servers/`,values)
 
     router.refresh();
     onClose();
   
   } catch (error) {
     toast({
      variant:"destructive",
      title:"Something went wrong"
   
     })
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
         {server?.members?.map((cur:any)=>{
          return(<ul>
            <li className="">
              <Image 
               src={cur.profile.imageUrl}
               alt={"profile"}
               height={180}
               width={180}
              />{cur.profile.name}
            </li>
          </ul>)
         })}
  </DialogContent>
 
</Dialog>

    </>) 
}


export default MangaeMembersModal;