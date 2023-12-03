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
   return (
      <div className="container h-[calc(100vh-100px)] w-full flex flex-col items-center !px-28 !pt-16">
         <Heading title="About" />
         <div className="flex pt-6">
            <p className="text-xl w-full mt-5">
               Passionate about both machine learning and full-stack web
               development, I'm a versatile tech enthusiast dedicated to
               crafting innovative solutions. With a foundation in machine
               learning algorithms and a flair for front-end and back-end
               technologies, I thrive on blending data-driven insights with
               seamless user experiences. My aim is to create impactful
               applications that transcend boundaries and simplify complexities.
            </p>
            <div className="w-full bg-yellow-500 rounded-lg py-5">
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
      </div>
   );
};

export default AboutPage;
