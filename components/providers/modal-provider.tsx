'use client'

import { useEffect, useState } from "react"
import CreateServerModal from "../modals/create-server-modal"
import InviteModal from "../modals/invite-modal"
import EditServerModal from "../modals/edit-server-modal"
import MangaeMembersModal from "../modals/manage-members-modal"





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
    </>)
}

export default ModalProvider;