"use client";

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogsPage = () => {
   const [blog, setBlog] = useState("");

   const fetchAndSetBlog = async () => {
      setBlog((await axios.get("/blogs/linear-regression.html")).data);
   };

   useEffect(() => {
      fetchAndSetBlog();
   }, []);

   return (
      <div className="container lg:!px-28">
         <Image
            src={"/blogs/linear-regression.png"}
            width={500}
            height={500}
            alt="Image"
            className="w-full mb-10"
         />
         {blog && (
            <div
               className="bg-background pr-3 h-max jp-notebook"
               dangerouslySetInnerHTML={{ __html: blog }}
            ></div>
         )}
      </div>
   );
};

export default BlogsPage;
