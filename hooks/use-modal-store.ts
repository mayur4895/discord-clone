
import { Server } from "@prisma/client";
import   {create} from "zustand";
export type ModalType = "createServer" | "invite"


interface ModalData{
    server?:Server;
}

interface ModalStore{
   type: ModalType | null
   data:ModalData
    onOpen:(type:ModalType,data?:ModalData)=>void
    onClose:()=>void
    isOpen:boolean
}

export const useModal = create<ModalStore>((set)=>({
    type:null,
    isOpen:false,
    data:{},
    onOpen: (type, data= {}) => set({ isOpen: true, type, data }),
    onClose:()=>set({type:null,isOpen:false})
 
}))
 