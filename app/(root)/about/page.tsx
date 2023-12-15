import Skill from "@/components/skill";
import Heading from "@/components/ui/heading";
import Image from "next/image";
import data from "@/public/personal-data.json";

const AboutPage = () => {
   const education_status = data.education_status;
   const about_description = data.about_description;
   const hobbies = data.hobbies;
   const skills: {
      [key: string]: { name: string; level: number; icon: string }[];
   } = data.skills;
   const field_skills = data.field_skills;

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
                     className=" h-48 w-48 relative z-10 grid place-items-center rounded-lg"
                  >
                     <span className="z-0 text-foreground text-2xl font-semibold text-center">
                        {hobby.name}
                     </span>
                     <div className="background !opacity-40 border rounded-lg overflow-hidden">
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
