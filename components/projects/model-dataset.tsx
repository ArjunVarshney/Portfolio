"use client";

import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { csvToHTML } from "@/lib/csvToHTML";

const Roboto = Roboto_Mono({
   subsets: ["latin"],
});

const Dataset = ({ data_link }: { data_link: string }) => {
   const [dataset, setDataset] = useState("");

   const fetchDataset = async () => {
      setDataset(csvToHTML((await axios.get(data_link)).data));
   };

   useEffect(() => {
      fetchDataset();
   }, []);

   return (
      <div
         className={cn(
            Roboto.className,
            "bg-white text-black p-8 pb-10 w-[calc(90vw-3rem)] rounded h-[calc(90vh-3rem)] overflow-auto"
         )}
         dangerouslySetInnerHTML={{ __html: dataset }}
      />
   );
};

export default Dataset;
