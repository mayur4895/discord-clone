'use client'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Button } from "@/components/ui/button"
 
import qs from "query-string"
 
 
 
import {  useToast } from "../ui/use-toast"
 import axios from "axios"  
import {  useParams, useRouter } from "next/navigation"
import { useModal } from '../../hooks/use-modal-store';
 
 
 

 
const LeaveServer = ()=>{
  const {isOpen,onClose,type,data} = useModal();
  const {server} = data;
   

  
  const isModalOpen = isOpen && type==="leaveServer";
const {toast} = useToast();
 const router = useRouter();
  

 
   async function onLeave() {
      
   try {
     
     const url = qs.stringifyUrl({
      url:`/api/servers/${server?.id}/leave`,
  
     })
     await axios.patch(url)
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
  <Dialog open={isModalOpen} onOpenChange={handleClose}>
      
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl">Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will Leave  
             <span className="text-blue-400"> ' {server?.name } ' </span> server and remove your data from this servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button>Cancel</Button>
          <Button onClick={onLeave} variant={"outline"}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>) 
}


export default LeaveServer;