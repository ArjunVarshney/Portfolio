import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
   return (
      <div className="w-full flex items-center justify-center px-28">
         <div className="h-full w-full text-7xl pr-16">
            <span className="text-custom-accent">Hi</span>, I am
            <span className="block font-bold">Arjun Varshney</span>
            <p className="text-2xl pt-5">
               Tech enthusiast skilled in machine learning and full-stack web
               development, passionate about crafting innovative solutions.
            </p>
            <div className="flex gap-2 pt-8">
               <Button
                  variant={"outline"}
                  className="font-bold text-black dark:text-white border-2 border-custom-accent hover:bg-custom-accent hover:scale-95 active:scale-100"
               >
                  Contact me
               </Button>
               <Button className="flex gap-1.5 items-center justify-center bg-custom-accent text-black hover:scale-95 active:scale-100 hover:bg-custom-accent font-bold">
                  Resume
                  <ExternalLink className="h-4 w-4" />
               </Button>
            </div>
         </div>
         <div className="w-full max-w-[400px] flex items-center justify-center h-[calc(100vh-100px)]">
            <Image
               height={500}
               width={500}
               src={"/my-photo.webp"}
               alt="Profile Photo"
               className="rounded-full border-8 border-custom-accent"
            />
         </div>
      </div>
   );
};

export default LandingPage;
