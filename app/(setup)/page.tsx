import { ModeToggle } from '@/components/mode-toggle'
import { intialProfile } from '@/lib/intial-profile'
import { db } from '@/lib/db'
import { UserButton } from '@clerk/nextjs'
import  {redirect} from "next/navigation"
import InitialModal from '@/components/modals/IntialModal'
 

 const SetupPage   = async ()=> {
    const profile = await intialProfile();
    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId:profile.id
                }
            }
        }
    });
   

    if(server){
        return redirect(`/servers/${server.id}`)
    }

  return (
     <>
<InitialModal/>
     </>
  )
}
export default SetupPage 