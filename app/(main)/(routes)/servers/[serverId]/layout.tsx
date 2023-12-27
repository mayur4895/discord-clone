 
 
import ServerSidebar from "@/components/server/ServerSidebar";
import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/navigation";

interface ServerIdLayoutProps{
    children:React.ReactNode,
    params:{serverId:string}
}

const ServerIdLayout = async ({ children ,params}:ServerIdLayoutProps) => {


const profile = await currentProfile();

if(!profile){
    return redirectToSignIn();
}

 const server =  await db.server.findUnique({
    where:{
        id:params?.serverId,
        members:{
            some:{
                profileId:profile.id
            }
        }
    }
 })


if(!server){
    return redirect("/");
}

 

 return(<>
 <div className="h-full">
<div className="hidden md:flex h-full flex-col w-60 z-20  fixed inset-y-0 ">
 <ServerSidebar
 serverId={params?.serverId}
 />
</div>
<main className=" h-full md:pl-60">
    {children}
</main>
 </div>
  
 </>)
}

export default ServerIdLayout