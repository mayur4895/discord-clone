
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
  
interface ActionToolTipProps{
    children:React.ReactNode;
    label:string;
    side?: "left" | "right" | "top" | "bottom";
    align?: "center" | "end" | "start";
     
}

const ActionToolTip:React.FC<ActionToolTipProps> = ({
    side,
    label,
    align,
    children
})=>{
    return(<>
    <TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>{
        children
        }</TooltipTrigger>
    <TooltipContent side={side} align={align}>
      <p className=" font-semibold">{label.toLowerCase()}</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>

    </>)
}

export default ActionToolTip