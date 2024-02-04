"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
 import qs from "query-string"
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
import { Hash, Plus, PlusIcon, Smile } from "lucide-react"
import { BsEmojiDizzyFill } from "react-icons/bs"
import axios from "axios"

const formSchema = z.object({
  content: z.string().min(1),
})



interface channelIdProps{
    type:"channel" | "conversation"
    name:string
    apiUrl:string
    query:Record<string,any>
}


const ChatInput = ({type,name,apiUrl,query}:channelIdProps) => {


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          content: "",
        },
      })
     
     
     async function onSubmit(values: z.infer<typeof formSchema>) {

            const url = qs.stringifyUrl({
              url:"/api/socket/messages",
              query:query
            })
            await axios.post(url,values);

      }
 
const isloding = form.formState.isSubmitting;
    return ( <>
  
    <div className="mt-auto ">

   
     <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8  ">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
        
              <FormControl>
                
                <div className="relative p-6 pb-6">
                     <Button   className="absolute top-8 left-8 h-[24px] w-[24px] bg-zinc-500 dark:bg-zinc-600 hover:bg-zinc-600 dark:hover:bg-zinc-500 transition rounded-full p-1 flex items-center justify-center">
                     <Plus className="text-white dark:text-[#313338]" />
                     </Button>
               
                <Input disabled={isloding} placeholder={ `Message ${type =="conversation" ? name : "#"+name}`} {...field}  className="px-12"/>
                <div className="absolute top-8 right-8 cursor-pointer">
                <Smile
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
        />
                  </div>
                </div>
              </FormControl> 
            </FormItem>
          )}
        />
        
      </form>
    </Form>

    </div>
    </>);
}
 
export default ChatInput;