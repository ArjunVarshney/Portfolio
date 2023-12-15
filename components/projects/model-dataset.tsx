"use client";

import { Roboto_Mono } from "next/font/google";
import { useEffect, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { csvToHTML } from "@/lib/csvToHTML";
import CircularProgress from "../ui/spinner";

const Roboto = Roboto_Mono({
   subsets: ["latin"],
});

const Dataset = ({ data_link }: { data_link: string }) => {
   const [dataset, setDataset] = useState("");
   const [loading, setLoading] = useState(false);

   const fetchDataset = async () => {
      try {
         setLoading(true);
         // setDataset(csvToHTML((await axios.get(data_link)).data));
         setDataset(JSON.stringify((await axios.get(data_link)).data));
      } catch (error) {
         setDataset(JSON.stringify(error));
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchDataset();
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
         dangerouslySetInnerHTML={{ __html: dataset }}
      />
   );
};

export default Dataset;
