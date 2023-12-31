"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

interface ArrayObject {
   [key: string]: string[];
}

interface MultiArrayInputProps {
   value: ArrayObject;
   onChange: Function;
}

const MultiArrayInput = ({ value, onChange }: MultiArrayInputProps) => {
   const [arrayObject, setArrayObject] = useState<ArrayObject>(value);

   const handleAddArray = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
   ) => {
      e.preventDefault();
      setArrayObject({
         ...arrayObject,
         [`stack${Object.keys(arrayObject).length + 1}`]: [],
      });
   };

   const handleKeyChange = (
      key: string,
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      const updatedObject: ArrayObject = { ...arrayObject };
      const newArray = arrayObject[key];
      updatedObject[event.target.value] = newArray;
      delete updatedObject[key];
      setArrayObject(updatedObject);
   };

   const handleValueChange = (key: string, tags: string[]) => {
      const updatedObject: ArrayObject = { ...arrayObject };
      updatedObject[key] = tags;
      setArrayObject(updatedObject);
   };

   const handleRemoveArray = (key: string) => {
      const updatedObject: ArrayObject = { ...arrayObject };
      delete updatedObject[key];
      setArrayObject(updatedObject);
   };

   useEffect(() => {
      onChange(arrayObject);
   }, [arrayObject]);

   return (
      <div className="flex flex-col gap-3 my-3">
         {Object.entries(arrayObject).map(([key, value]) => (
            <div
               key={Object.keys(arrayObject).indexOf(key)}
               className="flex gap-3"
            >
               <Input
                  type="text"
                  placeholder="Enter key"
                  value={key}
                  onChange={(e) => handleKeyChange(key, e)}
                  className="w-48"
               />
               <div className="flex gap-3 w-full">
                  <TagsInput
                     // @ts-ignore
                     value={value}
                     onChange={(tags) => handleValueChange(key, tags)}
                  />
                  <Button
                     variant={"destructive"}
                     onClick={() => handleRemoveArray(key)}
                  >
                     Remove
                  </Button>
               </div>
            </div>
         ))}
         <Button onClick={(e) => handleAddArray(e)} variant={"outline"}>
            + Add Array
         </Button>
      </div>
   );
};

export default MultiArrayInput;
