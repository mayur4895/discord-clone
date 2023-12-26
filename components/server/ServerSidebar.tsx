import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirectToSignIn } from "@clerk/nextjs";

interface ServerSidebarProps {
    serverId:string
}
 
const ServerSidebar:React.FC<ServerSidebarProps> = async({
    serverId
}) => {
    const profile = await currentProfile();

    if(!profile){
        return redirectToSignIn();
    }
    

    const server =   db.server.findUnique({
        where:{
            id:serverId
        },
        include:{
             channels:{
                orderBy:{
                    createdAt:'desc'
                }
            },
            members:{
                include:{
                    profile:true
                },
                orderBy:{
                    role:"desc"
                }
            }
        }
    });


    return (  <>
    <div className="bg-[#2e2c2c] h-full">
ss
    </div>
    </>);
}
 
export default ServerSidebar;