import { v4 as uuidv4 } from "uuid";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

export   async function POST(req:Request){
try {
    const {searchParams} = new URL(req.url);
    const serverId = searchParams.get('serverId')
    const {name ,type} = await req.json();
    
    const profile = await currentProfile();

    if(!profile){
        return new NextResponse("Unauthorized",{status:401})
    }

    if(!serverId){
        return new NextResponse("serverId not provided",{status:401})
    }

    if(name === 'general'){
        return new NextResponse("channel name is not general",{status:401})
    }

    const server = await db.server.update({
        where:{
         id:serverId,
         members:{
            some:{
                profileId:profile?.id,
                role:{
                    in:[MemberRole.ADMIN , MemberRole.MODERATOR]
                }

            }
         }
        
        },
        data:{
       
            channels:{
                create:[
                    {
                      name,
                      type,
                      profileId:profile.id  
                    }
                ]
            },
        
        }
    });

    return NextResponse.json(server);
    
} catch (error) {
    console.log("servers_post",error);
    return new NextResponse("internal error",{status:500})
    
}
}


