import  {auth, currentUser,redirectToSignIn} from "@clerk/nextjs"

import {db} from "@/lib/db"


export const  currentProfile =  async () =>{
    const {userId} =   auth();
 
    

    if(!userId){
        return  null;
    }

const profile =  await db.profile.findUnique({
    where:{
        userId:userId
    }
});

if(profile){
    return profile;
} 


}


 