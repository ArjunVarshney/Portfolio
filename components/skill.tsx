import Image from "next/image";

const Skill = ({
   name,
   level,
   icon,
}: {
   name: string;
   level: number;
   icon: string;
}) => {
   let level_color = ["#dc2626", "#f59e0b", "#84cc16", "#2dd4bf", "#4ade80"];
   let level_text = [
      "Beginner",
      "Somewhat skilled",
      "Skilled",
      "Very skilled",
      "Expert",
   ];
   return (
      <div
         className="my-1 p-3 rounded-lg relative overflow-hidden z-10 font-semibold border border-foreground text-black dark:text-white"
         key={name}
      >
         <div className="flex gap-2 items-center text-foreground">
            <Image
               src={icon}
               height={50}
               width={50}
               alt={icon}
               className="h-5 w-5 dark:invert grayscale-0"
            />
            {name}
         </div>
         <span className="absolute right-2 top-1/2 -translate-y-1/2 font-normal py-1 px-1.5 rounded-lg">
            {level_text[level - 1]}
         </span>
         <div
            className="absolute top-0 bottom-0 left-0 -z-10 opacity-30"
            style={{
               background: level_color[level - 1],
               width: `${level * 20}%`,
            }}
         ></div>
         <div
            className="absolute top-0 bottom-0 left-0 -z-10 opacity-30 bg-custom-accent"
            style={{
               width: `${level * 20}%`,
            }}
         ></div>
      </div>
   );
};

export default Skill;
