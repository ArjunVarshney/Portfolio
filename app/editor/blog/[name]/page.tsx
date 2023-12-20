"use client";
import EditorInputBlog from "@/components/editor/editor-Input-blog";
import { InputType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const TechPage = ({ params }: { params: { name: string } }) => {
   const [tech, setTech] = useState<any>({});

   const fetchData = async () => {
      setTech(
         (await axios.get("/api/blog")).data.filter(
            (t: { blog_url: string }) => t.blog_url === params.name
         )[0]
      );
   };

   useEffect(() => {
      fetchData();
   }, []);

   const techInputs: InputType[] = [
      {
         type: "text",
         name: "title",
         required: true,
      },
      {
         type: "textarea",
         name: "description",
         required: true,
      },
      {
         type: "text",
         name: "featured_image",
         required: true,
      },
      {
         type: "text",
         name: "blog_url",
         required: true,
      },
      {
         type: "text",
         name: "fetch_url",
      },
      {
         type: "text",
         name: "type",
         required: true,
      },
      {
         type: "checkbox",
         name: "show_title",
         required: true,
      },
      {
         type: "text-array",
         name: "tags",
      },
   ];

   return (
      <div className="container">
         {tech.title && (
            <EditorInputBlog
               inputs={techInputs}
               api={"/api/blog/" + tech.blog_url}
               defaults={tech}
               patch
            />
         )}
      </div>
   );
};

export default TechPage;
