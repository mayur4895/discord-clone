import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";






export async function DELETE(req:Request,
    {params}:{params:{channelId:string}}
    ){
    try {
        const profile = await currentProfile();
    const {searchParams} =  new URL(req.url);
    const serverId = searchParams.get("serverId");



  

    if(!profile){
        return  NextResponse.json("Unauthorized",{status:400});
    }
    
    if(!serverId){
        return  NextResponse.json("ChannelId not provided",{status:400}); 
    }
    
    if(!params?.channelId){
        return  NextResponse.json("ServerId not provided",{status:400}); 
    }

     
    const server =   await db.server.update({
        where:{
            id:serverId,
            members:{
            some:{
                  profileId:profile.id,  
                  role:{
                      
                      in:[MemberRole.ADMIN , MemberRole.MODERATOR]     
                }
                
            }
            }
        },
        data:{
            channels:{
                delete:{
                    id:params?.channelId,
                    NOT:{
                        name:"general"
                    }
                }
            }
        }
    })
    return  NextResponse.json(server,{status:200});

    } catch (error) {
       return  NextResponse.json("SERVER-ERROR",{status:500});
    }
}








export async function PATCH(req:Request,
    {params}:{params:{channelId:string}}
    ){
    try {
        const profile = await currentProfile();
    const {searchParams} =  new URL(req.url);
    const serverId = searchParams.get("serverId");



    const {type, name} = await req.json();


    if(!profile){
        return  NextResponse.json("Unauthorized",{status:400});
    }
    
    if(!serverId){
        return  NextResponse.json("ChannelId not provided",{status:400}); 
    }
    
    if(!params?.channelId){
        return  NextResponse.json("ServerId not provided",{status:400}); 
    }

    if(name === "general"){
        return  NextResponse.json("Not deleted this channel",{status:400});    
    }

 

     
    const server =   await db.server.update({
        where:{
            id:serverId,
            members:{
            some:{
                  profileId:profile.id,  
                  role:{
                      
                      in:[MemberRole.ADMIN , MemberRole.MODERATOR]     
                }
                
            }
            }
        },
        data:{
            channels:{
                 update:{
                       where:{
                        id:params?.channelId,
                        NOT:{
                            name:"general"
                        }
                       },
                       data:{
                        name,
                        type
                       }
                }
            }
        }
    })
    return  NextResponse.json(server,{status:200});

    } catch (error) {
       return  NextResponse.json("SERVER-ERROR",{status:500});
    }
}