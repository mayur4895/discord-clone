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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"
import qs from "query-string"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
 
import {  useToast } from "../ui/use-toast"
 import axios from "axios"  
import {  useParams, useRouter } from "next/navigation"
import { useModal } from '../../hooks/use-modal-store';
import { ChannelType } from "@prisma/client"
import queryString from "query-string"
 



const formSchema = z.object({
    name: z.string().min(1,{
      message:"required"
    }).max(20).refine(name=>name !== "general",{
      message:"Channel name is not 'general' ! "
    }),
    type:z.nativeEnum(ChannelType)
})

const EditChannelModal = ()=>{
  const { isOpen, onClose, type, data } = useModal();
 
   const params = useParams();
  const isModalOpen = isOpen && type==="editChannel";
  const {channelType ,server,channel} = data;
const {toast} = useToast();
 const router = useRouter();
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name:"",
        type: channelType || ChannelType.TEXT  
    },
  })

  useEffect(() => {
    if (channel) {

      form.setValue("name", channel?.name);
  
      form.setValue("type", channel?.type);
    }
  }, [form,channel]);

  const isloding = form.formState.isSubmitting;
   async function onSubmit(values: z.infer<typeof formSchema>) {
      
   try {
     
     const url = qs.stringifyUrl({
      url:`/api/channels/${channel?.id}`,
      query:{
        serverId:server?.id
      }

     })
     await axios.patch(url,values)
     form.reset();
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
  form.reset;
  onClose();
 }
 
    return(<>
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
  <DialogContent className=" outline-none">
    <DialogHeader>
      <DialogTitle className="text-2xl">Edit Channel</DialogTitle>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">   

     
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Channel Name</FormLabel>
              <FormControl>
                <Input disabled={isloding} className="outline-none  focus:outline-none " placeholder="Enter Server Name" {...field} />
              </FormControl> 
              <FormMessage  className="text-xs text-rose-500"/>
            </FormItem>
          )}
        />

<FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Channel Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                  <SelectValue placeholder="Select a channel type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                        {Object.values(ChannelType).map((type) => (
                          <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                          >
                            {type.toLowerCase()}
                          </SelectItem>
                        ))}
                      </SelectContent>
              </Select>
             
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant={"primary"}>Save</Button>
      </form>
    </Form>
  </DialogContent>
 
</Dialog>

    </>) 
}


export default EditChannelModal;