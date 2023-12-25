'use client'
import { Plus } from "lucide-react";
import ActionToolTip from "../ActionToolTip";


const NavigationAction = ()=>{
    return(<>
    <ActionToolTip
    label="Add Server"
    side="left"

    >
    <button className=" group">
  <div className=" flex  rounded-2xl mb-2 h-[48px] w-[48px] p-2 group-hover:rounded-2xl justify-center transition bg-neutral-200 dark:bg-neutral-700  items-center overflow-hidden hover:bg-emerald-500/50">
    
 <Plus size={20}/>
  </div>
</button>
    </ActionToolTip>
    </>)
}

export default NavigationAction;