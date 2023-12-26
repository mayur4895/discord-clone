
import { currentProfile } from '../../lib/current-profile';
import { redirect } from "next/navigation"
import { db } from '@/lib/db';
import NavigationAction from './NavigationAction';
import { ModeToggle } from '../mode-toggle';
import { UserButton } from '@clerk/nextjs';
import { Separator } from "@/components/ui/separator" 

import { ScrollArea } from '../ui/scroll-area';
import Image from 'next/image';
import NavigationItem from './NavigationItem';

const NavigationSidebar = async () => {

    const profile = await currentProfile();
    if (!profile) {
        return redirect("/");
    }

    const servers = await db.server.findMany({
        where: {
            members: {
                some: {
                    profileId: profile.id
                }
            }
        }
    })


    return (<>
        <div className="flex flex-col h-full  dark:bg-[#1e1e1e] bg-[#f1f1f1]  items-center py-4">
            <NavigationAction />
      <Separator className='h-[2px] my-2'/>
            <ScrollArea className='flex-1 w-full'>
               {servers.map((server)=>{
                return(<div key={server.id} className='mb-4'>
                      <NavigationItem
                      name={server.name}
                      id={server.id}
                      imageUrl={server.imageUrl}
                      />
                </div>)
               })} 
            </ScrollArea>

          <div className='pb-3 mt-auto flex flex-col items-center gap-4'>
                  
          <ModeToggle 
          
          />
                <UserButton
                    afterSignOutUrl='/'
                    appearance={{
                        elements:{
                            avatarBox:"h-[42px] w-[42px]"
                        }
                    }}
                />
          </div>
        </div>


    </>)
}

export default NavigationSidebar;