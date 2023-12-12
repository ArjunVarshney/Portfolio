import ProjectCard from "@/components/projects/project-card";
import Heading from "@/components/ui/heading";
import projectData from "@/public/project-data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// @ts-ignore
const data: Project[] = projectData;

const ProjectsPage = () => {
   return (
      <div className="container !px-28 !pt-16 mb-12">
         <Heading title="Projects" />
         <Tabs defaultValue="All" className="w-full mt-5 flex flex-col mb-5">
            <TabsList className="mr-auto gap-2 h-[unset] p-2">
               <TabsTrigger
                  value="All"
                  className="border-2 border-purple-600 bg-purple-600 px-4 py-1"
               >
                  All
               </TabsTrigger>
               <TabsTrigger
                  value="Website"
                  className="border-2 border-amber-600 bg-amber-600 px-4 py-1"
               >
                  Website
               </TabsTrigger>
               <TabsTrigger
                  value="Packages/Utility"
                  className="border-2 border-red-600 bg-red-600 px-4 py-1"
               >
                  Packages/Utility
               </TabsTrigger>
               <TabsTrigger
                  value="Models/Analysis"
                  className="border-2 border-blue-600 bg-blue-600 px-4 py-1"
               >
                  Models/Analysis
               </TabsTrigger>
            </TabsList>
            <TabsContent value="All">
               <div className="grid grid-cols-3 gap-5 my-2">
                  {data.map((project) => (
                     <ProjectCard project={project} key={project.project_url} />
                  ))}
               </div>
            </TabsContent>
            <TabsContent value="Website">
               <div className="grid grid-cols-3 gap-5 my-2">
                  {data
                     .filter((project) => project.type === "website")
                     .map((project) => (
                        <ProjectCard
                           project={project}
                           key={project.project_url}
                        />
                     ))}
               </div>
            </TabsContent>
            <TabsContent value="Packages/Utility">
               <div className="grid grid-cols-3 gap-5 my-2">
                  {data
                     .filter(
                        (project) =>
                           project.type === "utility" ||
                           project.type === "package"
                     )
                     .map((project) => (
                        <ProjectCard
                           project={project}
                           key={project.project_url}
                        />
                     ))}
               </div>
            </TabsContent>
            <TabsContent value="Models/Analysis">
               <div className="grid grid-cols-3 gap-5 my-2">
                  {data
                     .filter(
                        (project) =>
                           project.type === "analysis" ||
                           project.type === "model"
                     )
                     .map((project) => (
                        <ProjectCard
                           project={project}
                           key={project.project_url}
                        />
                     ))}
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
};

export default ProjectsPage;
