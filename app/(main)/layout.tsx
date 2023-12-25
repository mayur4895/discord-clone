import NavigationSidebar from "@/components/navigations/NavigationSidebar";

const MianLayout = ({ children }: { children: React.ReactNode }) => {
    return ( 
      <div className="h-full">


<div className="hidden md:flex w-[72px]  fixed z-30 flex-col  inset-y-0 f-full">
 <NavigationSidebar/>
</div>
<main className="md:pl-[72px]">
{children}
</main>
      </div>
     );
  }
   
  export default MianLayout;