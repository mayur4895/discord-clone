import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

 






export   async function DELETE(req:Request,
  {params}:{params :{serverId:string}}){
  try {

      
      const profile = await currentProfile();
  
      if(!profile){
          return new NextResponse("Unauthorized",{status:401})
      }
  
      const server = await db.server.delete({
          where:{
              id:params?.serverId,
              profileId:profile.id,
            
               
          }
      });
  
      return NextResponse.json(server);
      
  } catch (error) {
      console.log("servers_delete",error);
      return new NextResponse("internal error",{status:500})
      
  }
  }
  
  











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