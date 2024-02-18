"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import data from "@/public/personal-data.json";
import { TypeAnimation } from "react-type-animation";

const LandingPage = () => {
   return (
      <div className="container w-full lg:min-h-[calc(100vh-100px)] h-max flex flex-col-reverse lg:flex-row items-center justify-center !px-10 md:!px-28 !pt-0 !pb-10">
         <div className="w-full text-4xl md:text-7xl lg:pr-16 text-center lg:text-left mb-10">
            <div className="z-10 bg-background opacity-0 fill-mode-forwards animate-fadeIn delay-700">
               <span className="text-custom-accent">Hi</span>, I am
            </div>
            <div className="font-bold z-0">
               <TypeAnimation
                  sequence={["Arjun Varshney"]}
                  wrapper="span"
                  speed={50}
               />
            </div>
            <p className="text-xl md:text-2xl pt-5 opacity-0 animate-fadeIn fill-mode-forwards delay-700">
               Tech enthusiast skilled in machine learning and full-stack web
               development, passionate about crafting innovative solutions.
            </p>
            <div className="flex flex-col md:flex-row justify-center lg:justify-between items-center gap-2 pt-8 opacity-0 animate-fadeIn fill-mode-forwards delay-1000">
               <Link href="/resume-arjun-varshney.pdf" target="_blank">
                  <Button className="flex gap-1.5 items-center justify-center bg-custom-accent text-white hover:scale-95 active:scale-100 hover:bg-custom-accent font-bold">
                     Resume
                     <ExternalLink className="h-4 w-4" />
                  </Button>
               </Link>
               <div className="flex gap-3">
                  <Link href={data.linkedin} className="btn-outline !p-0.5">
                     <div
                        className="h-10 w-10 bg-custom-accent"
                        style={{
                           mask: "url(/icons/linkedin.svg) no-repeat center",
                           maskSize: "contain",
                        }}
                     />
                  </Link>
                  <Link
                     href={data.github}
                     className="btn-outline !p-0.5 !px-1.5"
                  >
                     <div
                        className="h-8 w-8 bg-custom-accent"
                        style={{
                           mask: "url(/icons/github.svg) no-repeat center",
                           maskSize: "contain",
                        }}
                     />
                  </Link>
                  <Link
                     href={data.leetcode}
                     className="btn-outline !p-0.5 !px-1.5"
                  >
                     <div
                        className="h-7 w-7 bg-custom-accent"
                        style={{
                           mask: "url(/icons/leetcode.svg) no-repeat center",
                           maskSize: "contain",
                        }}
                     />
                  </Link>
               </div>
            </div>
         </div>
         <div className="w-full max-w-[400px] flex items-center justify-center py-5 md:h-full opacity-0 animate-fadeIn fill-mode-forwards delay-1000">
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
