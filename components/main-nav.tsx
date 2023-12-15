"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
   routes: {
      href: string;
      active: boolean;
      label: string;
   }[];
}

const MainNav = ({ routes, className, ...props }: MainNavProps) => {
   const params = useParams();

   return (
      <nav
         className={cn(
            "items-center space-x-2 lg:space-x-4 hidden sm:flex",
            className
         )}
      >
         {routes.map((route) => (
            <a href={route.href} key={route.href}>
               <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                     "text-sm font-medium transition-colors p-2 rounded-lg hover:text-primary hover:bg-neutral-100 dark:hover:bg-gray-900",
                     route.active
                        ? "text-black dark:text-white"
                        : "text-muted-foreground"
                  )}
               >
                  {route.label}
               </Link>
            </a>
         ))}
      </nav>
   );
};

export default MainNav;
