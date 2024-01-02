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
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "../ui/select";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
   let defaultValue: { [key: string]: string | number | boolean | string[] } =
      {};
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
         for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].required && value[inputs[i].name] !== 0) {
               if (!value[inputs[i].name]) {
                  window.alert(
                     "All the fields should be filled before making a prediction"
                  );

                  return;
               }
               if (
                  // @ts-ignore
                  !(typeof value[inputs[i].name] === "object") &&
                  // @ts-ignore
                  !isNaN(value[inputs[i].name])
               ) {
                  value[inputs[i].name] = Number(value[inputs[i].name]);
               }
            }
         }
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
                     onClick={() => onRun()}
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
                        <div className="bg-background px-4 p-3 rounded-lg flex flex-col justify-between">
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
                              required={input.required || false}
                           />
                        </div>
                     )}
                     {input.type === "number" && (
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
                              step={.0001}
                              placeholder={String(input.placeholder || "")}
                              type="number"
                              className="my-2"
                              value={[String(value[input.name])]}
                              onChange={(e) => {
                                 const curr = e.target.value;
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = parseInt(curr) || "";
                                    return dPrev;
                                 });
                              }}
                              required={input.required || false}
                           />
                        </div>
                     )}
                     {input.type === "select" && (
                        <div className="px-4 p-3 rounded-lg flex flex-col w-full bg-background gap-2">
                           <Label
                              htmlFor={input.name}
                              className="capitalize text-lg font-medium"
                           >
                              {input.name.replaceAll("_", " ")}
                           </Label>
                           <Select
                              name={input.name}
                              onValueChange={(value) => {
                                 const curr = value;
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = curr || "";
                                    return dPrev;
                                 });
                              }}
                              value={String(value[input.name])}
                              required={input.required || false}
                           >
                              <SelectTrigger className="w-full">
                                 <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {input.values.map((value) => (
                                    <SelectItem
                                       value={String(value)}
                                       key={value}
                                    >
                                       {value}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                        </div>
                     )}
                     {input.type === "radio" && (
                        <div className="px-4 p-3 rounded-lg flex flex-col w-full bg-background gap-2">
                           <Label
                              htmlFor={input.name}
                              className="capitalize text-lg font-medium"
                           >
                              {input.name.replaceAll("_", " ")}
                           </Label>
                           <RadioGroup
                              onValueChange={(value) => {
                                 const curr = value;
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = curr || "";
                                    return dPrev;
                                 });
                              }}
                              value={String(value[input.name])}
                              required={input.required || false}
                           >
                              {input.values.map((value) => (
                                 <div
                                    className="flex items-center space-x-2"
                                    key={value}
                                 >
                                    <RadioGroupItem value={value} id={value} />
                                    <Label
                                       htmlFor={value}
                                       className="capitalize"
                                    >
                                       {value}
                                    </Label>
                                 </div>
                              ))}
                           </RadioGroup>
                        </div>
                     )}
                     {input.type === "checkbox" && (
                        <div className="px-4 p-3 bg-background rounded-lg">
                           <div className="flex flex-col gap-1.5 justify-between">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                              <div className="flex gap-3 items-start">
                                 <div>{input.placeholder}</div>
                                 <input
                                    type="checkbox"
                                    name={input.name}
                                    className="my-2"
                                    checked={Boolean(value[input.name])}
                                    onChange={() => {
                                       setValue((prev) => {
                                          const dPrev = { ...prev };
                                          dPrev[input.name] = !dPrev[input.name]
                                             ? 1
                                             : 0;
                                          return dPrev;
                                       });
                                    }}
                                    required={input.required || false}
                                 />
                              </div>
                           </div>
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
