import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectCard from "@/components/projects/project-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import tech from "@/public/tech.json";
import projectData from "@/public/project-data.json";

// @ts-ignore
const data: Project[] = projectData;

const techData: {
   name: string;
   logo: string;
   color: string;
}[] = tech;

const Website = ({ project }: { project: Project }) => {
   return (
      <>
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
         <div className="mt-5 leading-6 text-lg tracking-wide [word-spacing:4px]">
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
                                 className="h-[500px] rounded-lg w-fit"
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
         <div className="text-2xl font-bold mt-8">Features</div>
         <ul className="mt-2 ml-5 leading-6 text-lg tracking-wide [word-spacing:4px]">
            {project.type === "website" &&
               project.features.map((feature: string) => (
                  <li className="mt-2 list-disc" key={feature}>
                     <span className="font-semibold">
                        {feature.substring(0, feature.indexOf(":"))}:
                     </span>
                     {feature.substring(feature.indexOf(":") + 1)}
                  </li>
               ))}
         </ul>
         <div className="text-2xl font-bold mt-8">Tech Stack</div>
         <div className="mt-3">
            {project.type === "website" &&
               Object.entries(project.tech_stack).map(([key, value]) => (
                  <ul className="mt-2" key={key}>
                     <li className="flex justify-between items-center py-2.5 px-3 background-parent rounded-lg">
                        <div className="background bg-custom-accent !opacity-30 dark:!opacity-10" />
                        <h3 className="text-lg font-semibold capitalize">
                           {key}
                        </h3>
                        <ul className="flex gap-2">
                           {value.map((tech) => {
                              const technology = techData.filter((t) =>
                                 tech
                                    .toLowerCase()
                                    .includes(t.name.toLowerCase())
                              )[0];
                              return technology ? (
                                 <div
                                    className="pl-2 pr-3 py-1 text-white rounded-lg capitalize font-medium flex items-center"
                                    style={{
                                       background: technology.color,
                                    }}
                                    key={tech}
                                 >
                                    <Image
                                       src={technology.logo}
                                       height={50}
                                       width={50}
                                       alt={"logo"}
                                       className="h-5 w-5 invert grayscale-0 mr-2 rounded-sm"
                                    />
                                    {tech}
                                 </div>
                              ) : (
                                 <div
                                    className="pl-2 pr-2 py-1 text-background bg-foreground rounded-lg capitalize font-medium flex items-center"
                                    key={tech}
                                 >
                                    {tech}
                                 </div>
                              );
                           })}
                        </ul>
                     </li>
                  </ul>
               ))}
         </div>
         <div className="text-2xl font-bold mt-8">Most Used Packages</div>
         <div>
            <ul className="mt-2 flex gap-2">
               {project.type === "website" &&
                  project.most_used_packages.map((module) => {
                     const technology = techData.filter(
                        (t) => t.name.toLowerCase() === module.toLowerCase()
                     )[0];
                     return technology ? (
                        <div
                           className="px-3 py-1 text-white rounded-lg capitalize font-medium flex flex-col items-center justify-center text-lg"
                           style={{
                              background: technology.color,
                           }}
                           key={module}
                        >
                           <div className="p-4">
                              <Image
                                 src={technology.logo}
                                 height={80}
                                 width={80}
                                 alt={"logo"}
                                 className="h-12 w-12 invert grayscale-0 rounded-sm"
                              />
                           </div>
                           {module}
                        </div>
                     ) : (
                        <div
                           className="px-2 py-1 text-background bg-foreground rounded-lg capitalize font-medium flex items-center"
                           key={module}
                        >
                           {module}
                        </div>
                     );
                  })}
            </ul>
         </div>
         <div className="text-2xl font-bold mt-8">Other Projects</div>
         <div className="grid grid-cols-3 gap-5 mt-3">
            {data
               .filter(
                  (p) =>
                     p.type === project.type &&
                     p.project_url !== project.project_url
               )
               .slice(0, 3)
               .map((project) => (
                  <ProjectCard project={project} key={project.name} />
               ))}
         </div>
      </>
   );
};

export default Website;
