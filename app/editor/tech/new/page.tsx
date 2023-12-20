"use client";
import EditorInput from "@/components/editor/editor-Input-tech";
import { InputType } from "@/types";

const NewTechPage = () => {
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
         <EditorInput
            inputs={techInputs}
            api="/api/tech"
            defaults={{
               name: "Add Name",
               color: "#123456",
               logo: "/icons/add.svg",
            }}
         />
      </div>
   );
};

export default NewTechPage;
