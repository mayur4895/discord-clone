import { MenuIcon } from "lucide-react";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import ServerSidebar from "./server/ServerSidebar";
import NavigationSidebar from "./navigations/NavigationSidebar";
  
interface MobileToggle{
    serverId:string
}

const MobileToggle = ({serverId}:MobileToggle) => {
    return (  <>
    <Sheet>
  <SheetTrigger>
  <MenuIcon className=" cursor-pointer"/>
  </SheetTrigger>
  <SheetContent side={"left"} className="p-0 gap-0 flex">
<div className="w-[72px]">
    <NavigationSidebar/>
</div>
 
 <ServerSidebar serverId={serverId}/>
 
  </SheetContent>
</Sheet>

 
    </>);
}
 
export default MobileToggle;