import { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ProjectCard from "@/components/projects/project-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import tech from "@/public/tech.json";
import projectData from "@/public/project-data.json";
import ModelInput from "./model-input";
import Notebook from "./model-notebook";
import Dataset from "./model-dataset";
import markdown from "@wcj/markdown-to-html";

// @ts-ignore
const data: Project[] = projectData;

const techData: {
   name: string;
   logo: string;
   color: string;
}[] = tech;

const ModelPage = ({ project }: { project: Project }) => {
   return (
      <>
         <div className="flex gap-1 flex-wrap mt-4">
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
         <div
            className="mt-5 leading-6 text-lg tracking-wide [word-spacing:4px] markdown"
            dangerouslySetInnerHTML={{ __html: markdown(project.description) }}
         />
         <div className="flex items-center justify-between mt-5">
            <h2 className="text-2xl font-bold">Links:</h2>
            <div className="flex gap-2">
               <Link
                  href={project.git_link[0]}
                  className="btn-outline !rounded-full"
                  target="_blank"
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
               {(project.type === "model" || project.type === "analysis") &&
                  project.kaggle_dataset && (
                     <Link
                        href={project.kaggle_dataset}
                        className="btn !rounded-full !bg-sky-500 !text-white"
                        target="_blank"
                     >
                        <Image
                           src={"/icons/kaggle.svg"}
                           height={50}
                           width={50}
                           alt={"giticon"}
                           className="h-5 w-5 grayscale-0 mr-2"
                        />
                        Dataset
                     </Link>
                  )}
            </div>
         </div>
         {(project.type === "model" || project.type === "analysis") && (
            <ScrollArea className="mt-3">
               <div className="flex gap-2">
                  <Dialog>
                     <DialogTrigger className="w-full">
                        <Image
                           src={project.featured_image}
                           height={500}
                           width={500}
                           alt="image"
                           className="h-[500px] object-cover rounded-lg w-full"
                        />
                     </DialogTrigger>
                     <DialogContent className="w-[90vw] max-w-none h-[90vh]">
                        <ScrollArea className="h-full rounded">
                           <Image
                              src={project.featured_image}
                              height={2000}
                              width={2000}
                              alt="image"
                              className="w-full"
                           />
                        </ScrollArea>
                     </DialogContent>
                  </Dialog>
               </div>
               <ScrollBar orientation="horizontal" />
            </ScrollArea>
         )}
         <div className="text-2xl font-bold mt-8">Feature Description</div>
         <ul className="mt-2 ml-5 leading-6 text-lg tracking-wide [word-spacing:4px]">
            {(project.type === "model" || project.type === "analysis") &&
               Object.entries(project.feature_description).map(
                  ([key, value]) => (
                     <li className="mt-2 list-disc" key={key}>
                        <span className="font-semibold">{key}: </span>
                        {value}
                     </li>
                  )
               )}
         </ul>
         {(project.type === "model" || project.type === "analysis") && (
            <div className="mt-5">
               <div className="flex justify-between items-center py-2.5 px-3 background-parent rounded-lg">
                  <div className="background bg-custom-accent !opacity-30 dark:!opacity-10" />
                  <h3 className="text-lg font-semibold capitalize">Files</h3>
                  <div className="flex gap-2">
                     <div className="flex gap-2">
                        <Dialog>
                           <DialogTrigger>
                              <div className="pl-2 pr-3 py-1 text-white rounded-lg capitalize font-medium flex items-center bg-orange-600">
                                 <Image
                                    src={"/icons/jupyter.svg"}
                                    height={50}
                                    width={50}
                                    alt={"logo"}
                                    className="h-5 w-5 invert grayscale-0 mr-2 rounded-sm"
                                 />
                                 Notebook
                              </div>
                           </DialogTrigger>
                           <DialogContent className="w-[90vw] max-w-none h-[90vh]">
                              <Notebook nb={project.ipynb_json} />
                           </DialogContent>
                        </Dialog>
                     </div>
                     <div className="flex gap-2">
                        <Dialog>
                           <DialogTrigger>
                              <div className="pl-2 pr-3 py-1 text-white rounded-lg capitalize font-medium flex items-center bg-green-600">
                                 <Image
                                    src={"/icons/dataset.svg"}
                                    height={50}
                                    width={50}
                                    alt={"logo"}
                                    className="h-5 w-5 invert grayscale-0 mr-2 rounded-sm"
                                 />
                                 Dataset
                              </div>
                           </DialogTrigger>
                           <DialogContent className="w-[90vw] max-w-none h-[90vh]">
                              <Dataset data_link={project.dataset} />
                           </DialogContent>
                        </Dialog>
                     </div>
                  </div>
               </div>
            </div>
         )}
         {project.type === "model" && project.inputs && project.api && (
            <ModelInput
               inputs={project.inputs}
               examples={project.examples}
               api={project.api}
               name={project.name}
            />
         )}
         <div className="text-2xl font-bold mt-8">Most Used Packages</div>
         <div>
            <div className="mt-2 flex flex-wrap gap-2">
               {(project.type === "model" || project.type === "analysis") &&
                  project.most_used_packages.map((module) => {
                     const technology = techData.filter(
                        (t) => t.name.toLowerCase() === module.toLowerCase()
                     )[0];
                     return technology ? (
                        <div
                           className="min-w-[100px] px-3 py-1 text-white rounded-lg capitalize font-medium flex flex-col items-center justify-center text-lg"
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
            </div>
         </div>
         <div className="text-2xl font-bold mt-8">Other Projects</div>
         <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 my-2">
            {data
               .filter(
                  (p) =>
                     p.type === project.type &&
                     p.project_url !== project.project_url
               )
               .concat(data)
               .slice(0, 3)
               .map((project) => (
                  <ProjectCard project={project} key={project.name} />
               ))}
         </div>
      </>
   );
};

export default ModelPage;
