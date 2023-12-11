import { Project } from "@/types";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const ProjectCard = ({ project }: { project: Project }) => {
   const color = {
      website: "bg-amber-600",
      package: "bg-red-600",
      model: "bg-blue-600",
      utility: "bg-purple-600",
      analysis: "bg-orange-600",
   };

   return (
      <Link href={"/projects/" + project.project_url}>
         <Card>
            <CardHeader>
               <CardTitle className="mb-2 flex justify-between">
                  <span className="truncate pb-0.5">{project.name}</span>
                  <Badge
                     className={cn(
                        "capitalize text-white",
                        color[project.type]
                     )}
                  >
                     {project.type}
                  </Badge>
               </CardTitle>
               <CardDescription className="flex gap-1 flex-wrap">
                  {project.tags.level &&
                     project.tags.level.map((level) => (
                        <Badge
                           key={level}
                           variant={"outline"}
                           className="background-parent border-0"
                        >
                           {level}
                           <div className="background bg-custom-accent !opacity-25" />
                           <div className="background bg-red-600" />
                        </Badge>
                     ))}
                  {project.tags["based-on"].map((tag) => (
                     <Badge
                        key={tag}
                        variant={"outline"}
                        className="background-parent border-0"
                     >
                        {tag}
                        <div className="background bg-custom-accent !opacity-25" />
                        <div className="background bg-amber-600" />
                     </Badge>
                  ))}
                  {project.tags.language.map((tag) => (
                     <Badge
                        key={tag}
                        variant={"outline"}
                        className="background-parent border-0"
                     >
                        {tag}
                        <div className="background bg-custom-accent !opacity-25" />
                        <div className="background bg-lime-600" />
                     </Badge>
                  ))}
                  {project.tags.other &&
                     project.tags.other.map((tag) => (
                        <Badge
                           key={tag}
                           variant={"outline"}
                           className="background-parent border-0"
                        >
                           {tag}
                           <div className="background bg-custom-accent !opacity-25" />
                           <div className="background bg-sky-600" />
                        </Badge>
                     ))}
               </CardDescription>
               <CardContent className="p-0">
                  <Image
                     src={project.featured_image}
                     height={500}
                     width={500}
                     alt={"project-image"}
                     className="rounded-lg mt-2 border dark:border-none aspect-video object-cover"
                  />
                  <div className="flex justify-between mt-3">
                     <Link
                        href={"/projects/" + project.project_url}
                        className="btn"
                     >
                        <Image
                           src={"/icons/view.svg"}
                           height={50}
                           width={50}
                           alt={"giticon"}
                           className="h-5 w-5 invert dark:filter-none grayscale-0 mr-2"
                        />
                        View Project
                     </Link>
                     <Link href={project.git_link[0]} className="btn-outline">
                        <Image
                           src={"/icons/github.svg"}
                           height={50}
                           width={50}
                           alt={"giticon"}
                           className="h-5 w-5 dark:invert grayscale-0 mr-2"
                        />
                        Github
                     </Link>
                  </div>
               </CardContent>
            </CardHeader>
         </Card>
      </Link>
   );
};

export default ProjectCard;
