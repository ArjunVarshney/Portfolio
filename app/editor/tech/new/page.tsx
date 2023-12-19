"use client";
import EditorInput from "@/components/editor/editor-Input";
import { InputType } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

const NewTechPage = () => {
   const techInputs: InputType[] = [
      {
         type: "text",
         name: "name",
      },
      {
         type: "color",
         name: "color",
      },
      {
         type: "url",
         name: "logo",
      },
   ];

   return (
      <div className="container">
         <EditorInput
            inputs={techInputs}
            api="/api/tech"
            defaults={{ name: "Add Name", color: "#123456", logo: "/icons/add.svg" }}
         />
      </div>
   );
};

export default NewTechPage;
