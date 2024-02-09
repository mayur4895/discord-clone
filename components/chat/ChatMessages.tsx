'use client'

import { Member } from "@prisma/client";

interface ChatMessagesProps{
    name:string
    member:Member
    socketQuery:Record<string,string>
    apiUrl:string
    chatId:string
    socketUrl:string
    paramKey:'channelId' | 'converationId'
    paramValue: string 
          
}
const ChatMessages = ({
    name,
    member,
    socketQuery,
    apiUrl,
    chatId,
    socketUrl,
    paramKey,
    paramValue
}:ChatMessagesProps) => {
    return (  <>
    </>);
}
 
export default ChatMessages;