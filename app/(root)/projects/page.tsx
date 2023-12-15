import ProjectCard from "@/components/projects/project-card";
import Heading from "@/components/ui/heading";
import projectData from "@/public/project-data.json";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { color } from "@/constants/colors";

// @ts-ignore
const data: Project[] = projectData;

const ProjectsPage = () => {
   return (
      <div className="container lg:!px-28 !pt-16 mb-12">
         <Heading title="Projects" />
         <Tabs defaultValue="All" className="w-full mt-5 flex flex-col mb-5">
            <TabsList className="mr-auto gap-2 h-[unset] p-2 sm:pl-20 relative bg-muted-foreground/10 grid grid-cols-2 w-full sm:flex sm:w-fit">
               <div className="font-semibold text-lg text-foreground absolute top-0 bottom-0 left-0 bg-foreground/10 p-3 px-4 hidden sm:flex items-center justify-center rounded-l">
                  Filter
               </div>
               <TabsTrigger
                  value="All"
                  className="border-2 sm:px-4 py-1"
                  style={{
                     borderColor: color["utility"],
                     backgroundColor: color["utility"],
                  }}
               >
                  All
               </TabsTrigger>
               <TabsTrigger
                  value="Website"
                  className="border-2 px-4 py-1"
                  style={{
                     borderColor: color["website"],
                     backgroundColor: color["website"],
                  }}
               >
                  Website
               </TabsTrigger>
               <TabsTrigger
                  value="Packages/Utility"
                  className="border-2 px-4 py-1"
                  style={{
                     borderColor: color["package"],
                     backgroundColor: color["package"],
                  }}
               >
                  Packages/Utility
               </TabsTrigger>
               <TabsTrigger
                  value="Models/Analysis"
                  className="border-2 px-4 py-1"
                  style={{
                     borderColor: color["model"],
                     backgroundColor: color["model"],
                  }}
               >
                  Models/Analysis
               </TabsTrigger>
            </TabsList>
            <TabsContent value="All">
               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 my-2">
                  {data.map((project) => (
                     <ProjectCard project={project} key={project.project_url} />
                  ))}
               </div>
            </TabsContent>
            <TabsContent value="Website">
               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 my-2">
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
               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 my-2">
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
               <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 my-2">
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
