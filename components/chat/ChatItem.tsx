'use client'

import { Member, Message, Profile, MemberRole } from '@prisma/client';
import { ShieldAlert, ShieldCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import ActionToolTip from '../ActionToolTip';
import Image from 'next/image';
import { TbPdf } from 'react-icons/tb';
import { AiFillFilePdf } from 'react-icons/ai';
 



interface ChatItemProps{
   
currentMember:Member;
id:string;
member: Member &{
    profile:Profile
};
fileUrl:string | null;
content:string;
deleted:boolean;
isupdated:boolean;
apiUrl:string;
timeStamp:string;
socketUrl:string
socketQuery:Record<string,string>
 
}


 


const IconMap = {
    "GUEST":null,
    "ADMIN":<ShieldAlert  className='h-4 w-4'/>,
    "MODERATOR":<ShieldCheck/>
}

const ChatItem = ({
id,
member,
fileUrl,
content,
deleted,
isupdated,
apiUrl,
timeStamp,
socketQuery,
currentMember,
socketUrl
}:ChatItemProps) => {

    const Filetype =  fileUrl?.split(".").pop();
    const isAdmin = member.role == MemberRole.ADMIN;
    const  isModerator = member.role == MemberRole.MODERATOR;
    const isOwner = member.id ==  currentMember.id;
    const   canDeleted = !deleted && (isAdmin || isModerator || isOwner);
    const   canUpdated = !deleted && isOwner  && !fileUrl; 
     
    const isPdf =  Filetype == "pdf" && fileUrl;
    const isImage =  !isPdf && fileUrl ;

    return (  
 
   <div className=' flex mx-4 my-4  w-full relative'>
       <div className=' relative  shadow-md bg-background/20 border px-2 py-2  rounded-l-md'>
    <div className='flex flex-row gap-1 items-center'>
    <Avatar className='h-5 w-5'>
            <AvatarImage src={member.profile.imageUrl}/>
          <AvatarFallback>?</AvatarFallback>
        </Avatar>
             <p className='text-sm'>{member.profile.name}</p>
     <ActionToolTip label={member.role} >
     {IconMap[member.role]}
     </ActionToolTip>
          <span className='text-xs  text-foreground/30'>{timeStamp}</span> 
    </div>
          
          {
            isImage && (
                <a href={fileUrl} target='_blank' rel='nopener noreferrer' className='relative cursor-pointer aspect-square justify-center  overflow-hidden bg-secondary mt-2 border flex items-center h-48 w-full'>
                    <Image 
                      src={fileUrl}
                      fill
                      alt='image'
                    />
                </a>
            )
          }
           

           {
            isPdf && (
                <a href={fileUrl} target='_blank' rel='nopener noreferrer' className='relative cursor-pointer justify-center  bg-secondary mt-2 border flex gap-3 items-center h-10 w-[243px]'>
                    <TbPdf   className='bg-rose-500 w-full h-full'/>
                    <span className='text-sm  truncate'>{fileUrl}</span>
                </a>
            )
          }
       </div>
       
   </div>
  
     );
}
 
export default ChatItem;