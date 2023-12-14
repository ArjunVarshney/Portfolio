"use client";

import { InputType } from "@/types";
import { Slider } from "../ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "../ui/spinner";

const ModelInput = ({
   inputs,
   examples,
   api,
   name,
}: {
   inputs: InputType[];
   examples: { [key: string]: string | number }[];
   api: string;
   name: string;
}) => {
   let defaultValue: { [key: string]: string | number } = {};
   const [value, setValue] = useState(defaultValue);
   const [result, setResult] = useState<any>(undefined);
   const [loading, setLoading] = useState(false);

   inputs.forEach((parameter) => {
      defaultValue[parameter.name] = parameter.default || 0;
   });

   const onRun = async () => {
      try {
         setLoading(true);
         setResult((await axios.post(api, value)).data.result);
      } catch (error) {
         setResult("Something went wrong!");
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const onReset = () => {
      setValue(defaultValue);
   };
   return (
      <div className="flex gap-5">
         <div className="mt-5 p-4 background-parent w-full rounded-lg">
            <div className="background bg-custom-accent !opacity-30 dark:!opacity-10"></div>
            <div className="flex justify-between items-center">
               <div className="text-2xl font-bold bg-blue-500 w-full mr-3 py-1 rounded px-2 text-background">
                  Try it out
               </div>
               <div className="flex gap-2">
                  <Button
                     className="font-semibold bg-red-500"
                     onClick={onReset}
                  >
                     Reset
                  </Button>
                  <Button
                     className="font-semibold bg-custom-accent"
                     onClick={onRun}
                     disabled={loading}
                  >
                     Run
                  </Button>
               </div>
            </div>
            <form className="grid grid-cols-3 gap-2 mt-4 pb-2">
               {inputs.map((input) => (
                  <>
                     {input.type === "slider" && (
                        <div className="bg-background px-4 p-3 rounded-lg">
                           <div className="flex justify-between items-center">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name}
                              </Label>
                              <span>{value[input.name]}</span>
                           </div>
                           <Slider
                              defaultValue={[Number(input.default) || 0]}
                              max={input.max}
                              min={input.min}
                              step={input.step}
                              name={input.name}
                              className="my-2"
                              value={[Number(value[input.name])]}
                              onValueChange={([value]) => {
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = value || 0;
                                    return dPrev;
                                 });
                              }}
                           />
                        </div>
                     )}
                  </>
               ))}
            </form>
         </div>
         <div className="flex flex-col gap-4 w-[30%] mt-5 pt-4">
            <div className="flex gap-2 items-center">
               {Object.entries(examples).map(([index, example]) => (
                  <Button
                     key={index}
                     className="bg-blue-500"
                     onClick={() => {
                        setValue(example);
                     }}
                  >
                     Example {Number(index) + 1}
                  </Button>
               ))}
            </div>
            <div className="p-6 bg-foreground text-background grid place-items-center rounded-lg text-2xl flex-1 relative">
               {loading ? (
                  <CircularProgress />
               ) : result === undefined ? (
                  "Click Run for Results"
               ) : (
                  <>
                     <span className="absolute top-2 text-lg text-muted-foreground">
                        {name}:
                     </span>
                     {JSON.stringify(result)}
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default ModelInput;
