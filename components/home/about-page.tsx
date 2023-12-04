import { cn } from "@/lib/utils";
import Heading from "../ui/heading";

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

   const skills: {
      [key: string]: { name: string; level: number }[];
   } = {
      languages: [
         {
            name: "Java",
            level: 7,
         },
         {
            name: "Javascript/Typescript",
            level: 9,
         },
         {
            name: "Python",
            level: 9,
         },
         {
            name: "HTML/CSS",
            level: 8,
         },
         {
            name: "Golang",
            level: 3,
         },
      ],
      "frameworks/packages": [
         {
            name: "Tensorflow",
            level: 8,
         },
         {
            name: "Sklearn",
            level: 8,
         },
         {
            name: "Matplotlib/seaborn",
            level: 7,
         },
         {
            name: "Flask",
            level: 5,
         },
         {
            name: "React/Nextjs",
            level: 8,
         },
         {
            name: "Expressjs",
            level: 7,
         },
      ],
      "Other Tools": [
         {
            name: "Docker",
            level: 7,
         },
         {
            name: "Github",
            level: 6,
         },
         {
            name: "Visual Studio Code",
            level: 9,
         },
         {
            name: "Figma",
            level: 7,
         },
         {
            name: "Photoshop",
            level: 3,
         },
         {
            name: "Davinci Resolve",
            level: 4,
         },
      ],
   };

   const field_skills = [
      {
         name: "Machine learning",
         level: 7,
      },
      {
         name: "Deep learning",
         level: 6,
      },
      {
         name: "Exploratory Data analysis",
         level: 8,
      },
      {
         name: "Full stack web development",
         level: 9,
      },
   ];

   const about_description =
      "Passionate about both machine learning and full-stack web development, I'm a versatile tech enthusiast dedicated to crafting innovative solutions. With a foundation in machine learning algorithms and a flair for front-end and back-end technologies, I thrive on blending data-driven insights with seamless user experiences. My aim is to create impactful applications that transcend boundaries and simplify complexities.";

   return (
      <div className="container min-h-[calc(100vh-100px)] w-full flex flex-col items-center !px-28 !pt-16 mb-12">
         <Heading title="About" />
         <div className="flex pt-6">
            <p className="text-[24px] w-full mt-5 leading-9 pr-5">
               {about_description}
            </p>
            <div className="w-full bg-custom-accent rounded-lg py-5">
               <h3 className="font-bold ml-5 mb-2 text-2xl">Education</h3>
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
         <h3 className="font-semibold block w-full text-3xl py-3">Skills</h3>

         <div className="flex w-full gap-1 flex-col mb-6 mt-2">
            {field_skills.map((skill) => (
               <>
                  <div
                     className="my-1 bg-background p-3 rounded-lg relative overflow-hidden z-10 font-semibold border border-black dark:border-white"
                     key={skill.name}
                  >
                     {skill.name}
                     <span className="absolute right-5">
                        {skill.level * 10}%
                     </span>
                     <div
                        className="absolute top-0 bottom-0 left-0 bg-custom-accent opacity-30 -z-10"
                        style={{
                           width: `${skill.level * 10}%`,
                        }}
                     ></div>
                  </div>
               </>
            ))}
         </div>
         <div className="flex w-full gap-5">
            {Object.keys(skills).map((skillHead) => (
               <div
                  className="w-full bg-custom-accent rounded-lg py-5"
                  key={skillHead}
               >
                  <h3 className="font-bold ml-5 text-2xl capitalize">
                     {skillHead}
                  </h3>
                  <div className="flex flex-col mt-3">
                     {skills[skillHead].map((skill) => (
                        <div
                           className="mx-5 my-1 bg-background p-3 rounded-lg relative overflow-hidden z-10 font-semibold border border-black dark:border-white"
                           key={skill.name}
                        >
                           {skill.name}
                           <span className="absolute right-5">
                              {skill.level * 10}%
                           </span>
                           <div
                              className="absolute top-0 bottom-0 left-0 bg-gray-500/30 -z-10"
                              style={{
                                 width: `${skill.level * 10}%`,
                              }}
                           ></div>
                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default AboutPage;
