"use client";

import Heading from "@/components/ui/heading";
import CircularProgress from "@/components/ui/spinner";
import { latexToHTML } from "@/lib/latexToHTML";
import { Blog } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogsPage = ({ params }: { params: { blogUrl: string } }) => {
   const [blog, setBlog] = useState("");
   const [head, setHead] = useState<{
      title: string;
      description: string;
      featured_image: string;
      tags: string[];
      show_title: boolean;
   }>({
      title: "",
      description: "",
      featured_image: "",
      tags: [],
      show_title: false,
   });

   const fetchAndSetBlog = async () => {
      const data: Blog[] = (await axios.get("/blog-data.json")).data;
      const blog_data = data.filter((b) => b.blog_url === params.blogUrl)[0];

      let html = (await axios.get(blog_data.fetch_url)).data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const paras = doc.querySelectorAll("p");
      for (let i = 0; i < paras.length; i++) {
         paras[i].innerHTML = latexToHTML(paras[i].innerText);
      }
      setBlog(doc.querySelector("html")?.innerHTML!);
      setHead(blog_data);
   };

   useEffect(() => {
      fetchAndSetBlog();
   }, []);

   return (
      <div className="container lg:!px-28 text-foreground">
         {blog && head ? (
            <>
               {head.show_title && (
                  <>
                     <Heading title={head.title} />
                     <div className="py-5 text-lg">{head.description}</div>
                  </>
               )}
               <Image
                  src={head.featured_image}
                  width={500}
                  height={500}
                  alt="Image"
                  className="w-full mb-5"
               />
               <div className="text-lg">
                  <div
                     className="bg-background pr-3 h-max jp-notebook"
                     dangerouslySetInnerHTML={{ __html: blog }}
                  ></div>
               </div>
            </>
         ) : (
            <div className="w-full flex items-center justify-center h-screen">
               <CircularProgress />
            </div>
         )}
      </div>
   );
};

export default BlogsPage;
