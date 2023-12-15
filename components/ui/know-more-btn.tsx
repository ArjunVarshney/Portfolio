import { cn } from "@/lib/utils";
import Link from "next/link";

const KnowMore = ({
   href,
   title,
   className,
}: {
   href: string;
   title: string;
   className?: string;
}) => {
   return (
      <a href={href} className="w-full">
         <Link
            className={cn(
               "text-lg font-semibold px-5 p-4 bg-custom-accent text-black mt-4 rounded-lg w-full text-center hover:scale-[99%] hover:opacity-90 transition active:scale-100 active:opacity-100 block",
               className || ""
            )}
            href={href}
         >
            {title}
         </Link>
      </a>
   );
};

export default KnowMore;
