'use client'
import { Plus } from "lucide-react";
import ActionToolTip from "../ActionToolTip";
import { useModal } from "@/hooks/use-modal-store";
 

const NavigationAction = ()=>{
  const {onOpen} = useModal();
    return(<>
    <ActionToolTip
    label="Add Server"
    side="left"

    >
    <button onClick={()=>{onOpen("createServer")}} className=" drop-shadow-md  group">
  <div className=" flex  rounded-[18px] mb-2 h-[48px] w-[48px] p-2 group-hover:rounded-2xl justify-center transition  bg-neutral-700 dark:bg-neutral-700 text-white items-center overflow-hidden hover:bg-emerald-600">
    
 <Plus size={20}/>
  </div>
</button>
    </ActionToolTip>
    </>)
}

export default NavigationAction;