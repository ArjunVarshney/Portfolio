"use client";
import EditorInputProject from "@/components/editor/editor-Input-project";
import { InputType } from "@/types";

const NewProjectPage = () => {
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
                  name: "featured_description",
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
            api="/api/project"
            defaults={{
               name: "",
               description: "",
               featured_image: "/icons/add.svg",
               project_url: "/",
               git_link: ["https://github.com/ArjunVarshney"],
               type: "website",
               tags: {
                  level: [],
                  "based-on": [],
                  language: [],
                  other: [],
               },
               website_link: ["/"],
               npm_link: ["/"],
               commits: ["/"],
               features: [],
               tech_stack: {},
               most_used_packages: [],
               images: ["/icons/add.svg"],
               feature_description: {},
            }}
         />
      </div>
   );
};

export default NewProjectPage;
