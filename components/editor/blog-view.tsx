"use client";

import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/heading";
import CircularProgress from "@/components/ui/spinner";
import { latexToHTML } from "@/lib/latexToHTML";
import { Blog } from "@/types";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const ViewBlog = ({ defaults }: { defaults: Blog }) => {
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
      let html = (await axios.get(defaults.fetch_url)).data;
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const paras = doc.querySelectorAll("p");
      for (let i = 0; i < paras.length; i++) {
         paras[i].innerHTML = latexToHTML(paras[i].innerText);
      }
      setBlog(doc.querySelector("html")?.innerHTML!);
      setHead(defaults);
   };

   useEffect(() => {
      fetchAndSetBlog();
   }, [defaults]);

   return (
      <div className="container !p-8 text-foreground">
         {blog && head ? (
            <>
               {head.show_title && (
                  <>
                     <Heading title={head.title} />
                     <div className="flex gap-1 mt-3 flex-wrap">
                        {head.tags.map((tag) => (
                           <Badge
                              key={tag}
                              variant={"outline"}
                              className="background-parent border-0"
                           >
                              {tag}
                              <div className="background bg-custom-accent !opacity-25" />
                              <div className="background bg-background/5" />
                           </Badge>
                        ))}
                     </div>
                     <div className="pt-3 pb-5 text-base font-sans">
                        {head.description}
                     </div>
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

export default ViewBlog;
