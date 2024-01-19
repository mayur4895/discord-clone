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
 



const formSchema = z.object({
    name: z.string().min(2).max(50),
    imageUrl:z.string().min(1,{
        message:"Server image is required"
    })
})

 

const EditServerModal = ()=>{
  const {isOpen,onClose,type,data} = useModal();
  const {server} = data;
  const isModalOpen = isOpen && type==="editServer";
const {toast} = useToast();
 const router = useRouter();
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name:"",
        imageUrl:""
    },
  })

  const isloding = form.formState.isSubmitting;
   async function onSubmit(values: z.infer<typeof formSchema>) {
      
   try {
     await axios.patch(`/api/servers/${server?.id}`,values)
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


 
useEffect(()=>{
  if(server){
    form.setValue("name",server.name);
    form.setValue("imageUrl",server.imageUrl)
  }
},[server,form])
 
    return(<>
    <Dialog open={isModalOpen} onOpenChange={handleClose} >
  <DialogContent className=" outline-none">
    <DialogHeader>
      <DialogTitle className="text-2xl">Customize your  Server</DialogTitle>
      <DialogDescription>
        You can change the server image and name of server here.
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">  
<div className="flex justify-center items-center ">

<FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
     
              <FormControl>
                <FileUplod 
                endpoint="serverImage"
                value={field.value}
                onChange={field.onChange}
                 
                />
              </FormControl> 
 
            </FormItem>
          )}
        />
</div>

     
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel >Server Name</FormLabel>
              <FormControl>
                <Input disabled={isloding} className="outline-none  focus:outline-none " placeholder="Enter Server Name" {...field} />
              </FormControl> 
              <FormMessage  className="text-xs text-rose-500"/>
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


export default EditServerModal;