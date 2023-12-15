import Heading from "../ui/heading";
import Skill from "../skill";
import KnowMore from "../ui/know-more-btn";
import data from "@/public/personal-data.json";

const AboutPage = () => {
   const education_status = data.education_status;
   const field_skills = data.field_skills;
   const about_description = data.about_description;

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
         <KnowMore href="/about" title="Know more about me" />
      </div>
   );
};

export default AboutPage;
