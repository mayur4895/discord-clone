'use client'

import { useEffect, useState } from "react"
import CreateServerModal from "../modals/create-server-modal"





const ModalProvider = ()=>{

const [isMounted,setisMounted] = useState(false)


useEffect(()=>{
setisMounted(true);
},[setisMounted])

if(!isMounted){
    return null
}

    return(<>
    <CreateServerModal/>
    </>)
}

export default ModalProvider;