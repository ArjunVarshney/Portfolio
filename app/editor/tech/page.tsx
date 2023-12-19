"use client";

import Heading from "@/components/ui/heading";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Tech = () => {
   const [tech, setTech] = useState<any[]>([]);

   const fetchData = async () => {
      setTech((await axios.get("/api/tech")).data);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="container">
         <Heading title="Edit Tech" />
         <div className="mt-8">
            {tech.map((t) => (
               <div className="py-4 px-6 border flex justify-between items-center rounded-lg mt-3">
                  <h2 className="text-xl font-bold">{t.name}</h2>
                  <Link
                     href={
                        "/editor/tech/" +
                        t.name.toLowerCase().replaceAll(" ", "-")
                     }
                  >
                     <div className="btn">Edit</div>
                  </Link>
               </div>
            ))}
            <Link href={"/editor/tech/new"}>
               <div className="py-4 px-6 border flex flex-row-reverse gap-3 justify-center items-center rounded-lg mt-3">
                  <h2 className="text-3xl font-bold">Add</h2>
                  <PlusCircle className="h-8 w-8" />
               </div>
            </Link>
         </div>
      </div>
   );
};

export default Tech;
