import Link from "next/link";
import Heading from "@/components/ui/heading";

const Editor = () => {
   return (
      <div className="container">
         <Heading title="Editor" />
         <div className="py-4 px-6 border flex justify-between items-center rounded-lg mt-8">
            <h2 className="text-xl font-bold">Tech</h2>
            <Link href={"/editor/tech"}>
               <div className="btn">Edit</div>
            </Link>
         </div>
         <div className="py-4 px-6 border flex justify-between items-center rounded-lg mt-3">
            <h2 className="text-xl font-bold">Blog</h2>
            <Link href={"/editor/blog"}>
               <div className="btn">Edit</div>
            </Link>
         </div>
         <div className="py-4 px-6 border flex justify-between items-center rounded-lg mt-3">
            <h2 className="text-xl font-bold">Projects</h2>
            <Link href={"/editor/project"}>
               <div className="btn">Edit</div>
            </Link>
         </div>
      </div>
   );
};

export default Editor;
