"use client";

import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ipynbToHTML } from "@/lib/ipynbToHTML";
import { cn } from "@/lib/utils";

const Roboto = Roboto_Mono({
   subsets: ["latin"],
});

const Notebook = ({ nb }: { nb: string }) => {
   const [notebook, setNotebook] = useState("");

   const fetchNotebook = async () => {
      setNotebook(ipynbToHTML((await axios.get(nb)).data));
   };

   useEffect(() => {
      fetchNotebook();
   }, []);

   return (
      <div
         className={cn(
            Roboto.className,
            "bg-white text-black p-8 pb-10 w-[calc(90vw-3rem)] rounded h-[calc(90vh-3rem)] overflow-auto"
         )}
         dangerouslySetInnerHTML={{ __html: notebook }}
      />
   );
};

export default Notebook;
