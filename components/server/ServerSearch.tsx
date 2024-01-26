'use client'
import { Search } from "lucide-react"
import { Button } from "../ui/button"



import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"
   
  import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
   
interface ServerSearchProps{
    data: {
        label: string;
        type: "channel" | "member",
        data: {
          icon: React.ReactNode;
          name: string;
          id: string;
        }[] | undefined
      }[]
    }

const ServerSearch = ({data}:ServerSearchProps)=>{
     const params = useParams();
     const router = useRouter();
    const [open, setOpen] = useState(false)
   
    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault()
          setOpen((open) => !open)
        }
      }
   
      document.addEventListener("keydown", down)
      return () => document.removeEventListener("keydown", down)
    }, [])


   const onClick = ({id,type}:{id:string,type:"member"|"channel"})=>{
  if(type === "member"){
    router.push(`/servers/${params?.serverId}/conversation/${id}`)
  }
  if(type === "channel"){
    router.push(`/servers/${params?.serverId}/channels/${id}`)
  }
   }



    return(<>
           <Button onClick={()=>{setOpen(true)}} variant={"outline"} className="w-56 bg-[#ffff]  transition text-zinc-800 dark:text-white cursor-pointer dark:bg-zinc-900  border-[1px] border-zinc-200  relative dark:border-zinc-700  m-2 p-[10px] rounded-sm px-3 flex flex-row justify-start items-center gap-2">
           <p className="text-xs text-muted-foreground absolute top-1 right-1">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-[0.65]">CTR</span>J
        </kbd>
      </p>
            <Search size={18}/> 
            Search
            
            </Button>


            <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
            {
                data.map(({label,type,data})=>{
                    return(
                    
                    <CommandGroup key={label} heading={label}>
                    {data?.map(({name,id,icon})=>{
                       return(
                               <CommandItem key={id} className="flex items-center gap-2" onSelect={()=>{onClick({id,type})}}>
                     
                            <span> {icon}</span>
                              <span className="">{name}</span>
                     
                            </CommandItem>
                            )
                    })
           }
          </CommandGroup>
                    )
                })
            }
          <CommandSeparator />

        </CommandList>
      </CommandDialog>
    </>)
}


export default ServerSearch