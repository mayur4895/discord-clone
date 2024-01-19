import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

 














export async function PATCH(req:Request ,
    
    {params}:{params:{serverId:string}}
    ){


    try {
       const body = await req.json();


       const {name ,imageUrl} = body;
       if(!name || !imageUrl){
        NextResponse.json("input fields not provide",{status:400});
       }
       
         const profile = await currentProfile();
 

       if(!profile){
        NextResponse.json("Unauthorized",{status:400});
       }

       if(!params.serverId){
        NextResponse.json("Serverid not provide",{status:400});
       }
         
  const server =  await db.server.update({
    where:{
        id:params?.serverId,
        profileId:profile?.id,
    },
    data:{
      name,
      imageUrl
    }
  })
  return NextResponse.json(server,{status:200});

    } catch (error) {
        console.log(error);
        
    }
}