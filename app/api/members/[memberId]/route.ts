import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export   async function DELETE(req:Request,
  {params}:{params:{memberId:string}}
 ){
 try {
     const profile = await currentProfile();
      const {searchParams} = new URL(req.url);
  
      const serverId =   searchParams.get("serverId");


      if(!profile){
         return new NextResponse("Unauthorized",{status:400})
      }

      if(!serverId){
         return new NextResponse("serverId not provided",{status:400})
      }

      if(!params.memberId){
         return new NextResponse("memberId not provided",{status:400})
      }

     const server = await db.server.update({
   where: {
     id: serverId,
     profileId: profile.id,
   },
   data: {
     members: {
       deleteMany: {

           id: params.memberId,
           profileId: {
             not: profile.id
           }
         },
        
       }
     
   },
   include: {
     members: {
       include: {
         profile: true,
       },
       orderBy: {
         role: "asc"
       }
     }
   }
 });
      return  NextResponse.json(server,{status:200});
 } catch (error) {
     return new NextResponse("SERVER_PATH_ERROR",{status:500})
 }
}


export   async function PATCH(req:Request,
     {params}:{params:{memberId:string}}
    ){
    try {
        const profile = await currentProfile();
         const {searchParams} = new URL(req.url);
         const {role} = await req.json();
        
         const serverId =   searchParams.get("serverId");


         if(!profile){
            return new NextResponse("Unauthorized",{status:400})
         }

         if(!serverId){
            return new NextResponse("serverId not provided",{status:400})
         }

         if(!params.memberId){
            return new NextResponse("memberId not provided",{status:400})
         }

        const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id
              }
            },
            data: {
              role
            }
          }
        }
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });
         return  NextResponse.json(server,{status:200});
    } catch (error) {
        return new NextResponse("SERVER_PATH_ERROR",{status:500})
    }
}