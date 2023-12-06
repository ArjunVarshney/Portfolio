import Skill from "@/components/skill";
import Heading from "@/components/ui/heading";
import Image from "next/image";

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

   const about_description =
      "Passionate about both machine learning and full-stack web development, I'm a versatile tech enthusiast dedicated to crafting innovative solutions. With a foundation in machine learning algorithms and a flair for front-end and back-end technologies, I thrive on blending data-driven insights with seamless user experiences. My aim is to create impactful applications that transcend boundaries and simplify complexities.";

   const hobbies = [
      {
         name: "Chess",
         image: "/hobby/hobby-chess.jpg",
      },
      {
         name: "Basketball",
         image: "/hobby/hobby-basketball.jpg",
      },
      {
         name: "Reading Books",
         image: "/hobby/hobby-books.jpg",
      },
      {
         name: "Trackmania",
         image: "/hobby/hobby-trackmania.jpg",
      },
      {
         name: "Exercise",
         image: "/hobby/hobby-exercise.jpg",
      },
   ];

   const skills: {
      [key: string]: { name: string; level: number; icon: string }[];
   } = {
      languages: [
         {
            name: "Java",
            level: 3,
            icon: "/icons/java.svg",
         },
         {
            name: "Javascript/Typescript",
            level: 5,
            icon: "/icons/typescript.svg",
         },
         {
            name: "Python",
            level: 4,
            icon: "/icons/python.svg",
         },
         {
            name: "HTML/CSS",
            level: 4,
            icon: "/icons/html.svg",
         },
         {
            name: "Golang",
            level: 1,
            icon: "/icons/golang.svg",
         },
      ],
      "frameworks/packages": [
         {
            name: "Tensorflow",
            level: 3,
            icon: "/icons/tensorflow.svg",
         },
         {
            name: "Scikit learn",
            level: 4,
            icon: "/icons/sklearn.svg",
         },
         {
            name: "Matplotlib/seaborn",
            level: 3,
            icon: "/icons/matplotlib.svg",
         },
         {
            name: "Flask",
            level: 2,
            icon: "/icons/flask.svg",
         },
         {
            name: "React/Nextjs",
            level: 4,
            icon: "/icons/next.svg",
         },
         {
            name: "Expressjs",
            level: 4,
            icon: "/icons/express.svg",
         },
      ],
      "Other Tools": [
         {
            name: "Docker",
            level: 3,
            icon: "/icons/docker.svg",
         },
         {
            name: "Github",
            level: 3,
            icon: "/icons/github.svg",
         },
         {
            name: "Visual Studio Code",
            level: 4,
            icon: "/icons/vscode.svg",
         },
         {
            name: "Figma",
            level: 4,
            icon: "/icons/figma.svg",
         },
         {
            name: "Photoshop",
            level: 1,
            icon: "/icons/photoshop.svg",
         },
         {
            name: "Davinci Resolve",
            level: 1,
            icon: "/icons/davinci.svg",
         },
      ],
   };

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

   return (
      <div className="container w-full flex flex-col items-center !px-28 !pt-16 mb-12">
         <Heading title="About" />
         <div className="flex items-end h-[280px] pt-6">
            <p className="text-[24px] w-full mt-5 leading-9 pr-5">
               {about_description}
            </p>
            <div className="w-full max-w-[400px] flex items-end justify-center h-full">
               <Image
                  height={500}
                  width={500}
                  src={"/my-photo.webp"}
                  alt="Profile Photo"
                  className="rounded-full border-8 border-custom-accent translate-y-5"
               />
            </div>
         </div>
         <div className="w-full mt-16">
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
            <div className="flex w-full gap-1 flex-col mb-2 mt-8">
               <h3 className="font-semibold w-full text-5xl pt-3 pb-5 border-foreground">
                  Skills
               </h3>
               {field_skills.map((skill) => (
                  <Skill
                     icon={skill.icon}
                     name={skill.name}
                     level={skill.level}
                     key={skill.name + skill.level}
                  />
               ))}
            </div>
            <div className="flex w-full gap-8">
               {Object.keys(skills).map((skillHead) => (
                  <div className="w-full rounded-lg py-5" key={skillHead}>
                     <h3 className="font-bold text-2xl capitalize pb-1 border-b-2 border-black/80 dark:border-white/80">
                        {skillHead}
                     </h3>
                     <div className="flex flex-col mt-3">
                        {skills[skillHead].map((skill) => (
                           <Skill
                              icon={skill.icon}
                              name={skill.name}
                              level={skill.level}
                              key={skill.name + skill.level}
                           />
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="flex w-full gap-1 flex-col mb-6 mt-8">
            <h3 className="font-semibold block w-full text-5xl pt-3 pb-5 border-foreground">
               Hobbies
            </h3>
            <div className="flex flex-wrap gap-5">
               {hobbies.map((hobby) => (
                  <div
                     key={hobby.name}
                     className=" h-48 w-48 relative z-10 grid place-items-center"
                  >
                     <span className="z-0 text-foreground text-2xl font-semibold text-center">
                        {hobby.name}
                     </span>
                     <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 opacity-40 border rounded-lg overflow-hidden">
                        <Image
                           src={hobby.image}
                           height={200}
                           width={200}
                           className="object-cover h-full w-full"
                           alt="hobby-image"
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default AboutPage;
