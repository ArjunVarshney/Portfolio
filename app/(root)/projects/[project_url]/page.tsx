import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/heading";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import projectData from "@/public/project-data.json";
import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogClose,
   DialogTrigger,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

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
         <div className="flex gap-1 flex-wrap mt-3">
            {project.tags.level &&
               project.tags.level.map((level: string) => (
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
            {project.tags["based-on"].map((tag: string) => (
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
            {project.tags.language.map((tag: string) => (
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
               project.tags.other.map((tag: string) => (
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
         </div>
         <div className="mt-3 leading-6 text-lg tracking-wide [word-spacing:4px]">
            {project.description}
         </div>
         <div className="flex items-center justify-between mt-5">
            <h2 className="text-2xl font-bold">Links:</h2>
            <div className="flex gap-2">
               {project.type === "website" && project.website_link && (
                  <Link
                     href={project.website_link[0]}
                     target="_blank"
                     className="btn-outline background-parent !rounded-full"
                  >
                     <div className="background bg-custom-accent"></div>
                     <Image
                        src={"/icons/website.svg"}
                        height={50}
                        width={50}
                        alt={"website-icon"}
                        className="h-5 w-5 dark:invert grayscale-0 mr-2"
                     />
                     Website
                  </Link>
               )}
               <Link
                  href={project.git_link[0]}
                  className="btn-outline !rounded-full"
               >
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
         </div>
         {project.type === "website" && (
            <ScrollArea className="mt-3">
               <div className="flex gap-2">
                  {[project.featured_image, ...project.images[0].reverse()].map(
                     (image) => (
                        <Dialog key={image}>
                           <DialogTrigger className="w-max">
                              <Image
                                 src={image}
                                 height={500}
                                 width={500}
                                 alt="image"
                                 className="h-[300px] rounded-lg w-fit"
                                 key={image}
                              />
                           </DialogTrigger>
                           <DialogContent className="w-[90vw] max-w-none h-[90vh]">
                              <ScrollArea className="h-full rounded">
                                 <Image
                                    src={image}
                                    height={2000}
                                    width={2000}
                                    alt="image"
                                    className="w-full"
                                    key={image}
                                 />
                              </ScrollArea>
                           </DialogContent>
                        </Dialog>
                     )
                  )}
               </div>
               <ScrollBar orientation="horizontal" />
            </ScrollArea>
         )}
         <div className="text-2xl font-bold mt-3">Features</div>
         <ul className="mt-2 ml-5 leading-6 text-lg tracking-wide [word-spacing:4px]">
            {project.type === "website" &&
               project.features.map((feature: string) => (
                  <li className="mt-1.5 list-disc" key={feature}>
                     <span className="font-semibold">
                        {feature.substring(0, feature.indexOf(":"))}:
                     </span>
                     {feature.substring(feature.indexOf(":") + 1)}
                  </li>
               ))}
         </ul>
         <div className="text-2xl font-bold mt-3">Tech Stack</div>
         <div>
            {project.type === "website" &&
               Object.entries(project.tech_stack).map(([key, value]) => (
                  <ul className="mt-2" key={key}>
                     <li className="list-disc ml-5">
                        <h3 className="text-lg font-medium capitalize">
                           {key}
                        </h3>
                        <ul className="flex gap-2">
                           {value.map((tech) => (
                              <div
                                 className="px-4 py-2 bg-foreground text-background rounded-lg capitalize font-medium"
                                 key={tech}
                              >
                                 {tech}
                              </div>
                           ))}
                        </ul>
                     </li>
                  </ul>
               ))}
         </div>
         <div className="text-2xl font-bold mt-5">Most Used Packages</div>
         <div>
            <ul className="mt-2 flex gap-2">
               {project.type === "website" &&
                  project.most_used_packages.map((module) => (
                     <li key={module}>
                        <h3 className="px-4 py-2 bg-foreground text-background rounded-lg capitalize font-medium">
                           {module}
                        </h3>
                     </li>
                  ))}
            </ul>
         </div>
      </div>
   );
};

export default ProjectPage;
