"use client";
import EditorInput from "@/components/editor/editor-Input-tech";
import { InputType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const TechPage = ({ params }: { params: { name: string } }) => {
   const [tech, setTech] = useState<any>({});

   const fetchData = async () => {
      setTech(
         (await axios.get("/api/tech")).data.filter(
            (t: { name: string }) =>
               t.name.toLowerCase() === params.name.replaceAll("-", " ")
         )[0]
      );
   };

   useEffect(() => {
      fetchData();
   }, []);

   const techInputs: InputType[] = [
      {
         type: "text",
         name: "name",
         required: true,
      },
      {
         type: "color",
         name: "color",
         required: true,
      },
      {
         type: "text",
         name: "logo",
         required: true,
      },
   ];

   return (
      <div className="container">
         {tech.name && (
            <EditorInput
               inputs={techInputs}
               api={"/api/tech/" + tech.name.toLowerCase()}
               defaults={tech}
               patch
            />
         )}
      </div>
   );
};

export default TechPage;
