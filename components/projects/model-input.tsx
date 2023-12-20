"use client";

import { InputType } from "@/types";
import { Slider } from "../ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import CircularProgress from "../ui/spinner";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

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
   let defaultValue: { [key: string]: string | number | boolean | string[] } = {};
   const [value, setValue] = useState(defaultValue);
   const [result, setResult] = useState<any>(undefined);
   const [loading, setLoading] = useState(false);

   inputs.forEach((parameter) => {
      if (typeof parameter.default === "number")
         defaultValue[parameter.name] = parameter.default || 0;
      else defaultValue[parameter.name] = parameter.default || "";
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
      <div className="flex flex-col xl:flex-row xl:gap-5">
         <div className="mt-5 p-4 background-parent w-full rounded-lg">
            <div className="background bg-custom-accent !opacity-30 dark:!opacity-10"></div>
            <div className="flex flex-col gap-2 lg:flex-row justify-between items-center">
               <div className="text-2xl font-bold bg-blue-500 w-full lg:mr-3 py-1 rounded px-2 text-background">
                  Try it out
               </div>
               <div className="hidden lg:grid grid-cols-2 gap-2 w-full lg:w-[unset]">
                  <Button
                     className="font-semibold bg-red-500 px-5"
                     onClick={onReset}
                  >
                     Reset
                  </Button>
                  <Button
                     className="font-semibold bg-custom-accent px-5"
                     onClick={onRun}
                     disabled={loading}
                  >
                     Run
                  </Button>
               </div>
            </div>
            <form
               className={cn(
                  "grid sm:grid-cols-2 md:grid-cols-3 gap-2 mt-4 pb-2",
                  inputs.length < 2 && "!grid-cols-1",
                  inputs.length < 3 && "md:grid-cols-2"
               )}
            >
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
                     {input.type === "text" && (
                        <div className="bg-background px-4 p-3 rounded-lg">
                           <div className="flex justify-between items-center">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                           </div>
                           <Input
                              defaultValue={String(input.default) || ""}
                              name={input.name}
                              placeholder={String(input.placeholder || "")}
                              className="my-2"
                              value={[String(value[input.name])]}
                              onChange={(e) => {
                                 const curr = e.target.value;
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = curr || "";
                                    return dPrev;
                                 });
                              }}
                           />
                        </div>
                     )}
                  </>
               ))}
            </form>
            <div className="grid grid-cols-2 gap-2 w-fit ml-auto lg:hidden">
               <Button
                  className="font-semibold bg-red-500 px-5"
                  onClick={onReset}
               >
                  Reset
               </Button>
               <Button
                  className="font-semibold bg-custom-accent px-5"
                  onClick={onRun}
                  disabled={loading}
               >
                  Run
               </Button>
            </div>
         </div>
         <div className="flex flex-col gap-4 xl:w-[30%] xl:mt-5 pt-4">
            <div className="flex gap-2 items-center">
               {Object.entries(examples).map(([index, example]) => (
                  <Button
                     key={index}
                     className="bg-blue-500 w-full xl:w-[unset]"
                     onClick={() => {
                        setValue(example);
                     }}
                  >
                     Example {Number(index) + 1}
                  </Button>
               ))}
            </div>
            <div className="p-6 min-h-[250px] bg-foreground text-background grid place-items-center rounded-lg text-base lg:text-lg 2xl:text-xl flex-1 relative">
               {loading ? (
                  <CircularProgress />
               ) : result === undefined ? (
                  "Click Run for Results"
               ) : (
                  <>
                     <span className="absolute top-2 text-lg text-muted-foreground">
                        {name}:
                     </span>
                     <div className="pt-5">{JSON.stringify(result)}</div>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default ModelInput;
