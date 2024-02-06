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
import { useModal } from "@/hooks/use-modal-store"
import qs from "query-string"
 



const formSchema = z.object({
 
    fileUrl:z.string().min(1,{
        message:"Server image is required"
    })
})

const MessageFileModal = ()=>{
const {toast} = useToast();
 const router = useRouter();
 const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        fileUrl:""
    },
  })

  const {onOpen,data,onClose,isOpen,type} = useModal();
  const isModalOpen = isOpen && type =="messageFile";
  const handleClose = ()=>{
      form.reset();
      onClose();
  }
  const { apiUrl ,query} = data;

  const isloding = form.formState.isSubmitting;
   async function onSubmit(values: z.infer<typeof formSchema>) {
      
   try {
    const url = qs.stringifyUrl({
      url:apiUrl || "",
      query
    })
     await axios.post(url,
      {...values,
      content: values.fileUrl,}
      )
     form.reset();
     router.refresh();
     handleClose();
   } catch (error) {
     toast({
      variant:"destructive",
      title:"Something went wrong"
   
     })
   }
  }

 
 
    return(<>
    <Dialog open={isModalOpen}  onOpenChange={handleClose} >
  <DialogContent className=" outline-none">
    <DialogHeader>
      <DialogTitle className="text-2xl">Attach File</DialogTitle>
      <DialogDescription>
        send the attachd file.
      </DialogDescription>
    </DialogHeader>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">  
<div className="flex justify-center items-center ">

<FormField
          control={form.control}
          name="fileUrl"
          render={({ field }) => (
            <FormItem>
     
              <FormControl>
                <FileUplod 
                endpoint="messageFile"
                value={field.value}
                onChange={field.onChange}
                 
                />
              </FormControl> 
 
            </FormItem>
          )}
        />
</div>

     
 
        <Button type="submit" disabled={isloding} variant={"primary"}>Send</Button>
      </form>
    </Form>
  </DialogContent>
 
</Dialog>

    </>) 
}


export default MessageFileModal;