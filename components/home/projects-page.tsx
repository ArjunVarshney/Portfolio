import projectData from "@/public/project-data.json";
import Heading from "../ui/heading";
import ProjectCard from "../projects/project-card";
import { Project } from "@/types";
import KnowMore from "../ui/know-more-btn";

// @ts-ignore
const data: Project[] = projectData;

const ProjectsPage = () => {
   let featuredProjects: Project[] = [];

   for (let i = 0; i < data.length; i++) {
      if (featuredProjects.some((project) => project.type == data[i].type))
         continue;
      featuredProjects.push(data[i]);
   }

   return (
      <div className="container lg:!px-28 my-24">
         <Heading title="Projects" />
         <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 my-8">
            {featuredProjects.map((project) => (
               <ProjectCard project={project} key={project.project_url} />
            ))}
         </div>
         <KnowMore href="/projects" title="View all projects" />
      </div>
   );
};

export default ProjectsPage;
