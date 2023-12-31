"use client";

import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/heading";
import { color } from "@/constants/colors";
import { Project } from "@/types";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Project = () => {
   const [project, setProject] = useState<Project[]>([]);

   const fetchData = async () => {
      setProject((await axios.get("/api/project")).data);
   };

   useEffect(() => {
      fetchData();
   }, []);

   return (
      <div className="container">
         <Heading title="Edit Project" />
         <div className="mt-8">
            {project.map((t) => (
               <div
                  className="py-4 px-6 border flex justify-between items-center rounded-lg mt-3"
                  key={t.name}
               >
                  <div className="flex gap-2">
                     <h2 className="text-xl font-bold">{t.name}</h2>
                     <Badge
                        className="capitalize text-white"
                        style={{ background: color[t.type] }}
                     >
                        {t.type}
                     </Badge>
                  </div>
                  <Link href={"/editor/project/" + t.project_url}>
                     <div className="btn">Edit</div>
                  </Link>
               </div>
            ))}
            <Link href={"/editor/project/new"}>
               <div className="py-4 px-6 border flex flex-row-reverse gap-3 justify-center items-center rounded-lg mt-3">
                  <h2 className="text-3xl font-bold">Add</h2>
                  <PlusCircle className="h-8 w-8" />
               </div>
            </Link>
         </div>
      </div>
   );
};

export default Project;
