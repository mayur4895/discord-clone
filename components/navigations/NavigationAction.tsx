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
    <button onClick={()=>{onOpen("createServer")}} className=" drop-shadow-md flex group">
  <div className=" flex      h-[42px] w-[42px]     justify-center transition   dark:text-white    text-black items-center overflow-hidden hover:text-emerald-600">
    
 <Plus size={20}/>
  </div>
</button>
    </ActionToolTip>
    </>)
}

export default NavigationAction;