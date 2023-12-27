
import { useEffect , useState } from "react"




const [isMounted,setisMounted] = useState(false);

export const useOrigin = ()=>{

useEffect(()=>{
    setisMounted(true);
},[setisMounted])

const origin =  typeof window.origin !== "undefined" &&  window.location.origin ? window.location.origin : ""

  
if(!isMounted){
    return ""
}

return origin;


      
}