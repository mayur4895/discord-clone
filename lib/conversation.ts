import { db } from "./db";



export default async function getOrCreateConversation(memberOneId:string,memberTwoId:string){
     
 let conversation = await  FindConversation(memberOneId,memberTwoId) ||  await FindConversation(memberTwoId,memberOneId);


 if(!conversation){
CreateConversation(memberOneId,memberTwoId);
 }

 return conversation;
}


const FindConversation = async(memberOneId:string,memberTwoId:string)=>{
    try {
        return await db.conversation.findFirst({
            where:{
                AND:[
                    {
                        memberOneId:memberOneId ,
                        memberTwoId:memberTwoId
                    }
                ]
            },include:{
                memberOne:{
                    include:{
                        profile:true
                    }
                },
                memberTwo:{
                    include:{
                        profile:true
            }
        }
    }
});

} catch (error) {
 return null;
}
}



const CreateConversation = async(memberOneId:string,memberTwoId:string)=>{
    try {
        return await db.conversation.create({
            data:{
                        memberOneId:memberOneId ,
                        memberTwoId:memberTwoId  
            },include:{
                memberOne:{
                    include:{
                        profile:true
                    }
                },
                memberTwo:{
                    include:{
                        profile:true
            }
        }
    }
});

} catch (error) {
 return null;
}
}