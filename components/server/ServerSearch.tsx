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
    return(<>
           <Button onClick={()=>{setOpen(true)}} variant={"outline"} className="w-full flex justify-start relative items-center gap-2 ">
           <p className="text-xs text-muted-foreground absolute top-1 right-1">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-[0.65]">CTR</span>J
        </kbd>
      </p>
            <Search size={18}/> 
            Search</Button>


            <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
            {
                data.map(({label,type,data})=>{
                    return(<>
                    
                    <CommandGroup heading={label}>
                    {data?.map(({name,id,icon})=>{
                       return(<>
                               <CommandItem className="flex items-center gap-2">
                               {icon}
                              <span className="">{name}</span>
                            </CommandItem>
                            </>)
                    })
           }
          </CommandGroup>
                    </>)
                })
            }
          <CommandSeparator />

        </CommandList>
      </CommandDialog>
    </>)
}


export default ServerSearch