import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils";


 interface MemberAvatarProps{
   imageUrl:string,
   className?:string

 }

 
const MemberAvatar = ({imageUrl,className}:MemberAvatarProps) =>{
return(
<>
<Avatar>
  <AvatarImage   className={cn(" h-10 w-10 p-1 rounded-full",className)} src={imageUrl}/>
  <AvatarFallback>?</AvatarFallback>
</Avatar>

</>)

}


export default MemberAvatar;