"use client";

import { Code2 } from "lucide-react";
import Link from "next/link";
import MainNav from "./main-nav";
import { ModeToggle } from "./mode-toggle";
import MobileNav from "./mobile-nav";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Roboto_Mono } from "next/font/google";

const mono = Roboto_Mono({
   subsets: ["latin"],
   display: "swap",
});

const Navbar = () => {
   const pathname = usePathname();

   const routes: { href: string; active: boolean; label: string }[] = [
      {
         href: "/about",
         label: "About",
         active: pathname === "/about",
      },
      {
         href: "/projects",
         label: "Projects",
         active: pathname === "/projects",
      },
   ];

   const [show, setShow] = useState(true);
   const [lastScrollY, setLastScrollY] = useState(0);

   const controlNavbar = () => {
      if (typeof window !== "undefined") {
         if (window.scrollY > lastScrollY && window.scrollY > 80) {
            setShow(false);
         } else {
            setShow(true);
         }

         setLastScrollY(window.scrollY);
      }
   };

   useEffect(() => {
      if (typeof window !== "undefined") {
         window.addEventListener("scroll", controlNavbar);

         return () => {
            window.removeEventListener("scroll", controlNavbar);
         };
      }
   }, [lastScrollY, controlNavbar]);

   return (
      <nav
         className={cn(
            "flex items-center border-b z-50 bg-background transition-all fixed w-full px-4",
            show ? "py-2 h-16" : "h-0 py-0 overflow-hidden"
         )}
      >
         <div className="flex items-center w-full animate-enter-top">
            <div className="flex gap-x-6">
               <a href={"/"}>
                  <Link
                     href={"/"}
                     className="text-md font-semibold flex gap-x-2 py-2 px-2 items-center"
                  >
                     <div
                        className={`bg-black text-white dark:bg-white dark:text-black py-1 px-2 text-[16px] rounded-lg font-bold ${mono.className}`}
                     >
                        AV
                     </div>
                     <div className="hidden !text-foreground text-lg xs:block">
                        Arjun Varshney
                     </div>
                  </Link>
               </a>
               <MainNav routes={routes} />
            </div>
            <div className="flex items-center space-x-4 ml-auto">
               <Link
                  target="_blank"
                  href="https://github.com/ArjunVarshney/Portfolio"
                  className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hidden sm:block"
               >
                  <Code2 size={20} className="text-foreground" />
               </Link>
               <ModeToggle />
               <MobileNav
                  routes={[
                     ...routes,
                     {
                        href: "https://github.com/ArjunVarshney/Portfolio",
                        label: "View on Github",
                        active: false,
                     },
                  ]}
               />
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
