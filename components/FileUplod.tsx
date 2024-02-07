'use client'
import { UploadDropzone } from "@/lib/uplodthing";
import "@uploadthing/react/styles.css"
import { File, X } from "lucide-react";
import Image from "next/image";
import { FcFile } from "react-icons/fc";
interface FileUplodProps{
    onChange:(url?:string) =>void;
endpoint: "messageFile" | "serverImage";
value:string
}



const FileUplod = ({
    onChange,
    value,
    endpoint

}:FileUplodProps) =>{

 
    const fileType = value?.split(".").pop();
    if(value && fileType !== "pdf"){
        return(
            
  <div className=" h-25 w-25 relative">
 
 <Image 
  width={150}
  height={150}
 className="   rounded-full h-[100px] w-[100px]  object-cover  drop-shadow-md "
 src={value}
 alt=""
 />
 <button type="button" onClick={()=>{onChange("")}} className=" absolute top-0 right-0 bg-rose-500 text-white p-1 rounded-full"> <X size={14}/></button>
            </div>
        )
    }


    if(value && fileType == "pdf"){
        return(
           
  <div className=" h-25 w-25 relative  items-center  p-2 mt-2 rounded-md bg-zinc-600/10  ">
 <FcFile  size={50}/>
<a  className=" truncate"   href={value}
          target="_blank"
          rel="noopener noreferrer">
 <p className=" truncate  w-80">{value}</p>
</a>
 
 <button type="button" onClick={()=>{onChange("")}} className=" absolute -top-2 -right-2 bg-rose-500 text-white p-1 rounded-full"> <X size={14}/></button>
            </div>
        )
    }
    return(<> 
    <div className="border-dashed border-foreground/25 border">  
 <UploadDropzone

 endpoint={endpoint}
 onClientUploadComplete={(res) => {
    onChange(res?.[0].url)
  }}
  onUploadError={(error: Error) => {
    console.log(`ERROR! ${error.message}`);
  }}
 />
 </div>
    </>)
}

export default FileUplod;