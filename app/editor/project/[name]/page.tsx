"use client";
import EditorInputProject from "@/components/editor/editor-Input-project";
import { InputType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const NewProjectPage = ({ params }: { params: { name: string } }) => {
   const [project, setProject] = useState<any>({});

   const fetchData = async () => {
      setProject(
         (await axios.get("/api/project")).data.filter(
            (t: { project_url: string }) => t.project_url === params.name
         )[0]
      );
      console.log(
         (await axios.get("/api/project")).data.filter(
            (t: { project_url: string }) => t.project_url === params.name
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
         type: "text",
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
         name: "project_url",
         required: true,
      },
      {
         type: "text-array",
         name: "git_link",
         required: true,
      },
      {
         type: "select",
         name: "type",
         values: ["website", "package", "utility", "analysis"],
         required: true,
      },
      {
         type: "inputs",
         name: "tags",
         inputs: [
            {
               type: "text-array",
               name: "level",
            },
            {
               type: "text-array",
               name: "based-on",
            },
            {
               type: "text-array",
               name: "language",
            },
            {
               type: "text-array",
               name: "other",
            },
         ],
      },
      {
         type: "conditional-input",
         name: "NA",
         switch: "type",
         inputs: {
            website: [
               {
                  type: "text-array",
                  name: "website_link",
               },
               {
                  type: "text-array",
                  name: "commits",
               },
               {
                  type: "text-array",
                  name: "features",
               },
               {
                  type: "object-array",
                  name: "tech_stack",
               },
               {
                  type: "text-array",
                  name: "most_used_packages",
               },
               {
                  type: "text-array",
                  name: "images",
               },
            ],
            package: [
               {
                  type: "text-array",
                  name: "npm_link",
               },
               {
                  type: "text-array",
                  name: "commits",
               },
               {
                  type: "text-array",
                  name: "features",
               },
               {
                  type: "text-array",
                  name: "images",
               },
            ],
            utility: [
               {
                  type: "text-array",
                  name: "commits",
               },
               {
                  type: "text-array",
                  name: "features",
               },
               {
                  type: "object-array",
                  name: "tech_stack",
               },
               {
                  type: "text-array",
                  name: "most_used_packages",
               },
               {
                  type: "text-array",
                  name: "images",
               },
            ],
            analysis: [
               {
                  type: "object-string",
                  name: "feature_description",
               },
               {
                  type: "text",
                  name: "ipynb_json",
               },
               {
                  type: "text",
                  name: "dataset",
               },
               {
                  type: "text",
                  name: "kaggle_dataset",
               },
               {
                  type: "text-array",
                  name: "most_used_packages",
               },
            ],
         },
      },
   ];

   return (
      <div className="container">
         <EditorInputProject
            inputs={techInputs}
            api={"/api/project/" + project.project_url}
            defaults={project}
            patch
         />
      </div>
   );
};

export default NewProjectPage;
