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
 
import { Input } from "@/components/ui/input"
 
import { useModal } from '../../hooks/use-modal-store';
import { Label } from "../ui/label";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import ActionToolTip from "../ActionToolTip";
import axios from "axios";
 



 

const InviteModal = ()=>{
  const {isOpen,onClose,type,data,onOpen} = useModal();

  const {server} = data;
const [Iscopy,setIscopy] = useState(false);
const [isLoading,setisLoading] = useState(false);
  const  InviteUrl = `${origin}/invite/${server?.inviteCode}`

  const isModalOpen = isOpen && type==="invite";
  
  const copy = ()=>{
      
    navigator.clipboard.writeText(InviteUrl);

    setIscopy(true);
    setInterval(()=>{  
      setIscopy(false); 
    },1000)

  }


  const onNew = async() =>{
   try {
    setisLoading(true);
    const response =  await axios.patch(`/api/servers/${server?.id}/invite-code`);
    onOpen("invite", { server: response.data });
   } catch (error) {
 return error;
   } finally{
setisLoading(false);
   }
  }
 
    return(<>
    <Dialog open={isModalOpen} onOpenChange={onClose} >
  <DialogContent className=" outline-none">
    <DialogHeader>
      <DialogTitle className="text-2xl">Invite Your Friends</DialogTitle>
      <DialogDescription>
        You can invite your friend via sharing invite link
      </DialogDescription>
    </DialogHeader>
    <Label>Server Invite Linked</Label>
    <div className="flex flex-row items-center gap-2"> 
    <Input  disabled={isLoading} contentEditable={false}  className="bg-zinc-900   border-0 focus-visible:ring-0   text-white focus-visible:ring-offset-0 overflow-clip " value={InviteUrl}/>
     
    
    <ActionToolTip label="Copy"> 
          <div>       
          {Iscopy ? <Check size={18} className="text-green-500"/>  :   <Copy size={18} onClick={copy}    className=" cursor-pointer text-zinc-900 dark:text-white "/>}
       </div>
      </ActionToolTip>
    </div>
    <div>  
    <Button
       onClick={onNew}
       disabled={isLoading} 
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-2"
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
          </div>    

  </DialogContent>
 
</Dialog>

    </>) 
}


export default InviteModal;