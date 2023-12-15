"use client";

import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { ipynbToHTML } from "@/lib/ipynbToHTML";
import { cn } from "@/lib/utils";
import CircularProgress from "../ui/spinner";

const Roboto = Roboto_Mono({
   subsets: ["latin"],
});

const Notebook = ({ nb }: { nb: string }) => {
   const [notebook, setNotebook] = useState("");
   const [loading, setLoading] = useState(false);

   const fetchNotebook = async () => {
      try {
         setLoading(true);
         // setNotebook(ipynbToHTML((await axios.get(nb)).data));
         setNotebook(JSON.stringify((await axios.get(nb)).data));
      } catch (error) {
         // setNotebook("Something went wrong!");
         setNotebook(JSON.stringify(error));
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchNotebook();
   }, []);

   return loading ? (
      <div className="w-full h-full grid place-items-center">
         <CircularProgress />
      </div>
   ) : (
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
