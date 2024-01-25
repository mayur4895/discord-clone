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
 
 
 

 
const DeleteServer = ()=>{
  const {isOpen,onClose,type,data} = useModal();
  const {server} = data;
   

  
  const isModalOpen = isOpen && type==="deleteServer";
const {toast} = useToast();
 const router = useRouter();
  

 
   async function onDelete() {
      
   try {
     
     const url = qs.stringifyUrl({
      url:`/api/servers/${server?.id}`,
  
     })
     await axios.delete(url)
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
      
      <DialogContent  >
        <DialogHeader>
          <DialogTitle className="text-2xl">Are you sure to Delete Server?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. Once you Deleted this
             <span className="text-blue-400"> ' {server?.name } ' </span> server. permanently deleted
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex items-center">
          <Button onClick={()=>{onClose()}}>Cancel</Button>
          <Button onClick={()=>{onDelete()}} variant={"outline"}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </>) 
}


export default DeleteServer;