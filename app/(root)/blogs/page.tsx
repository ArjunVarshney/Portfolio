"use client";

import { latexToHTML } from "@/lib/latexToHTML";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogsPage = () => {
   const [blog, setBlog] = useState("");

   const fetchAndSetBlog = async () => {
      let html = (await axios.get("/blogs/linear-regression.html")).data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const paras = doc.querySelectorAll("p");
      for (let i = 0; i < paras.length; i++) {
         paras[i].innerHTML = latexToHTML(paras[i].innerText);
      }
      console.log(doc.querySelectorAll("p")[2].innerHTML);
      setBlog(doc.querySelector("html")?.innerHTML!);
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
