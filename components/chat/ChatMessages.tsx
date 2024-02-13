'use client'

import { useChatQuery } from "@/hooks/use-chat-query";
import { Member, Message, Channel, Profile } from '@prisma/client';
import ChatWelcome from "./ChatWelcome";
 import {format} from "date-fns"
import { TbLoader2 } from "react-icons/tb";
import Image from "next/image";
import { Fragment } from "react";
import ChatItem from "./ChatItem";
interface ChatMessagesProps{
    name:string
    member:Member
    socketQuery:Record<string,string>
    apiUrl:string
    chatId:string
    socketUrl:string
    paramKey:'channelId' | 'conversationId'
    paramValue: string ,
    type:"channel" | "converation"
          
}

const DATE_FORMAT = "d MMM yyyy, HH:mm";

type MessageWithMemberWithProfile = Message &{
    member:Member & {
         profile:Profile
    }
}

const ChatMessages = ({
    name,
    member,
    socketQuery,
    apiUrl,
    chatId,
    socketUrl,
    paramKey,
    paramValue,
    type
}:ChatMessagesProps) => {
const queryKey = `chat:${chatId}`;
      const  {
        status,
        hasNextPage,
        hasPreviousPage,
        isFetchingNextPage,
        data
      } = useChatQuery({
        apiUrl,
        queryKey,
        paramKey,
        paramValue
      })
   
   if(status == "loading"){
    return(<>
   <div className=" flex-col justify-center items-center flex flex-1">
   
   <TbLoader2 className=" animate-spin h-11 w-11 text-zinc-600"/>
 
  
   <p className="text-xs mt-2 text-zinc-500">Lodding Messages...</p>
   </div>
    </>)
   }

   if(status == "error"){
    return(<>
   <div className=" flex-col justify-center items-center flex flex-1"> 
     <Image
     src="/server_error.png"
     alt="error"
     height={300}
     width={300}
     />
     <p className="text-sm mt-2 text-zinc-500">Something Went Wrong!</p>
   </div>
    </>)
   }

    return (  <> 
<div className=" h-full">
    
<ChatWelcome 
       name={name}
       type="channel"
       />
       <div className="flex flex-col-reverse px-4">
             {
                data?.pages.map((group,i)=>{
               return(
                <Fragment key={i}>
                      {
                        group.items.map((message:MessageWithMemberWithProfile)=>{
                            return(
                     
                               <ChatItem
                                key={message.id}
                                id={message.id}
                               content={message.content}
                               apiUrl={apiUrl}  
                               currentMember={member}
                               socketQuery={socketQuery}
                               socketUrl={socketUrl}
                               timeStamp={format(new Date(message.createdAt) , DATE_FORMAT)}
                               isupdated={message.updatedAt !== message.createdAt}
                               deleted={message.deleted}
                               fileUrl={message.fileUrl}
                               member={message.member}
                                
                               />
                          
                            )
                        })
                      }
                </Fragment>
               )
                })
             }
       </div>
</div>

    </>);
}
 
export default ChatMessages;