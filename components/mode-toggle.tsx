"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ModeToggle() {
   const [accent, setAccent] = useState("");
   const { setTheme } = useTheme();
   const accents = {
      Slate: "#64748b",
      Neutral: "#737373",
      Red: "#ef4444",
      Orange: "#f97316",
      Yellow: "#eab308",
      Lime: "#84cc16",
      Green: "#22c55e",
      Emarald: "#10b981",
      Teal: "#14b8a6",
      Cyan: "#06b6d4",
      Sky: "#06b6d4",
      Blue: "#3b82f6",
      Indigo: "#6366f1",
      Violet: "#8b5cf6",
      Puple: "#a855f7",
      Fuchsia: "#d946ef",
      Pink: "#ec4899",
      Rose: "#f43f5e",
   };

   useEffect(() => {
      const saved_accent = localStorage.getItem("custom-accent");
      if (saved_accent) {
         setAccent(saved_accent);
      }
   }, []);

   useEffect(() => {
      document.documentElement.style.setProperty("--custom-accent", accent);
      localStorage.setItem("custom-accent", accent);
   }, [accent]);

   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
               <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
               <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
               <span className="sr-only">Toggle theme</span>
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent align="end">
            <DropdownMenuLabel>Theme</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setTheme("light")}>
               Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
               Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
               System
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Accent</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ScrollArea className="h-[200px] p-0 m-0">
               {Object.entries(accents).map(([name, color]) => (
                  <DropdownMenuItem
                     onClick={() => setAccent(color)}
                     className={cn(
                        "flex items-center gap-2",
                        accent === color && "bg-gray-700/30 rounded-lg"
                     )}
                     key={color + name}
                  >
                     <div
                        className="rounded-full h-3 w-3"
                        style={{ background: color }}
                     />
                     <span>{name}</span>
                  </DropdownMenuItem>
               ))}
            </ScrollArea>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
