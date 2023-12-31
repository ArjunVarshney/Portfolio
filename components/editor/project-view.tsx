"use client";

import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/heading";
import CircularProgress from "@/components/ui/spinner";
import { latexToHTML } from "@/lib/latexToHTML";
import { Blog, Project } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import Website from "../projects/project-website";
import PackagePage from "../projects/project-package";
import ModelPage from "../projects/project-model";

const ViewProject = ({ defaults }: { defaults: Project }) => {
   const [project, setProject] = useState<Project>(defaults);

   useEffect(() => {
      setProject(defaults);
   }, [defaults]);

   return (
      <div className="container text-foreground relative">
         {project ? (
            <>
               <div className="container !pt-16 mb-12 absolute top-0 left-0">
                  <Heading title={project.name} />
                  {project.type === "website" && (
                     <Website project={project} />
                  )}
                  {project.type === "package" && (
                     <PackagePage project={project} />
                  )}
                  {project.type === "utility" && (
                     <PackagePage project={project} />
                  )}
                  {project.type === "model" && (
                     <ModelPage project={project} />
                  )}
                  {project.type === "analysis" && (
                     <ModelPage project={project} />
                  )}
               </div>
            </>
         ) : (
            <div className="w-full flex items-center justify-center h-screen">
               <CircularProgress />
            </div>
         )}
      </div>
   );
};

export default ViewProject;
