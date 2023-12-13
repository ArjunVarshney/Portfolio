import Website from "@/components/projects/project-website";
import Heading from "@/components/ui/heading";
import projectData from "@/public/project-data.json";
import { Project } from "@/types";

// @ts-ignore
const data: Project[] = projectData;

const ProjectPage = ({
   params,
}: {
   params: {
      project_url: string;
   };
}) => {
   const project = data.filter(
      (project) => project.project_url === params.project_url
   )[0];
   return (
      <div className="container !px-28 !pt-16 mb-12">
         <Heading title={project.name} />
         {project.type === "website" && <Website project={project} />}
      </div>
   );
};

export default ProjectPage;
