'use client'

import { useEffect, useState } from "react"
import CreateServerModal from "../modals/create-server-modal"
import InviteModal from "../modals/invite-modal"
import EditServerModal from "../modals/edit-server-modal"
import MangaeMembersModal from "../modals/manage-members-modal"
import CreateChannelModal from "../modals/create-channel-modal"
import LeaveServer from "../modals/leave-server"





const ModalProvider = ()=>{

const [isMounted,setisMounted] = useState(false)


useEffect(()=>{
setisMounted(true);
},[setisMounted])

if(!isMounted){
    return null
}

    return(<>
    <InviteModal/>
    <CreateServerModal/>
    <EditServerModal/>
    <MangaeMembersModal/>
    <CreateChannelModal/>
    <LeaveServer/>
    </>)
}

export default ModalProvider;