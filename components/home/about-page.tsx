import { cn } from "@/lib/utils";
import Heading from "../ui/heading";
import { Button } from "../ui/button";
import Link from "next/link";
import Skill from "../skill";

const AboutPage = () => {
   const education_status = [
      {
         name: "High School",
         from: "The Modern School",
         start: "2016",
         end: "2019",
         grades: "94%",
      },
      {
         name: "Intermediate",
         from: "The Modern School",
         start: "2019",
         end: "2021",
         grades: "93%",
      },
      {
         name: "Graduation (B.Tech CSE)",
         from: "SRMCEM",
         start: "2021",
         end: "2025",
         grades: "8.2cgpa",
      },
   ];

   const field_skills = [
      {
         icon: "/icons/machine-learning.svg",
         name: "Machine learning",
         level: 4,
      },
      {
         icon: "/icons/deep-learning.svg",
         name: "Deep learning",
         level: 3,
      },
      {
         icon: "/icons/web-dev.svg",
         name: "Full stack web development",
         level: 4,
      },
   ];

   const about_description =
      "Passionate about both machine learning and full-stack web development, I'm a versatile tech enthusiast dedicated to crafting innovative solutions. With a foundation in machine learning algorithms and a flair for front-end and back-end technologies, I thrive on blending data-driven insights with seamless user experiences. My aim is to create impactful applications that transcend boundaries and simplify complexities.";

   return (
      <div className="container min-h-[calc(100vh-100px)] w-full flex flex-col items-center !px-28 !pt-24 mb-12">
         <Heading title="About" />
         <div className="flex pt-6">
            <p className="text-[24px] w-full mt-5 leading-9 pr-5">
               {about_description}
            </p>
            <div className="w-full bg-custom-accent rounded-lg py-5">
               <h3 className="font-bold ml-5 mb-2 text-2xl text-background">
                  Education
               </h3>
               {education_status.reverse().map((edu) => (
                  <div
                     className="mx-5 my-1 bg-background p-3 rounded-lg relative"
                     key={edu.name}
                  >
                     <h4 className="font-semibold">{edu.name}</h4>
                     <span className="block">{edu.from}</span>
                     <span className="absolute right-3 top-3">
                        {edu.start}-{edu.end}
                     </span>
                     <span className="block">Grades: {edu.grades}</span>
                  </div>
               ))}
            </div>
         </div>
         <h3 className="font-semibold block w-full text-3xl pt-3 pb-1 border-b-2 border-foreground">
            Skills
         </h3>

         <div className="flex w-full gap-1 flex-col mb-6 mt-2">
            {field_skills.map((skill) => (
               <Skill
                  icon={skill.icon}
                  name={skill.name}
                  level={skill.level}
                  key={skill.name + skill.level}
               />
            ))}
         </div>
         <Link
            className="text-lg font-semibold px-5 p-4 bg-custom-accent text-black mt-4 rounded-lg w-full text-center hover:scale-[99%] hover:opacity-90 transition active:scale-100 active:opacity-100"
            href={"/about"}
         >
            Know more about me
         </Link>
      </div>
   );
};

export default AboutPage;
