"use client";

import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

interface MainNav {
   routes: {
      href: string;
      label: string;
      active: boolean;
   }[];
}

const MobileNav = ({ routes }: MainNav) => {
   const [open, setOpen] = useState(false);

   return (
      <>
         <Button
            size="icon"
            className="flex sm:hidden"
            variant="ghost"
            onClick={() => setOpen(true)}
         >
            <Menu />
         </Button>
         <div
            className={cn(
               "block sm:hidden absolute h-screen w-full top-0 bg-secondary dark:bg-gray-950 bg-gray-50 transition-all z-50",
               open ? "right-0" : "right-[100vw]"
            )}
         >
            <Button
               variant="ghost"
               className="absolute top-5 right-5"
               size="icon"
               onClick={() => setOpen(false)}
            >
               <X size={30} />
            </Button>
            <div className="flex flex-col space-y-5 w-full h-full items-start justify-center px-14">
               {routes.map((route) => (
                  <Link
                     key={route.href}
                     href={route.href}
                     onClick={() => setOpen(false)}
                     className={cn(
                        "text-3xl font-semibold w-full transition-colors p-4 rounded-lg hover:text-primary hover:bg-neutral-100 dark:hover:bg-gray-900",
                        route.active
                           ? "text-black dark:text-white"
                           : "text-muted-foreground"
                     )}
                  >
                     {route.label}
                  </Link>
               ))}
            </div>
         </div>
      </>
   );
};

export default MobileNav;
