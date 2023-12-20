"use client";

import { InputType } from "@/types";
import { Slider } from "../ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";

const EditorInput = ({
   inputs,
   api,
   defaults,
   patch = false,
}: {
   inputs: InputType[];
   api: string;
   defaults: any;
   patch?: boolean;
}) => {
   const router = useRouter();
   let defaultValue: { [key: string]: string | number } = defaults;
   const [value, setValue] = useState(defaultValue);
   const [loading, setLoading] = useState(false);

   const onRun = async (e: FormEvent<HTMLFormElement>) => {
      try {
         e.preventDefault();
         setLoading(true);
         if (patch) await axios.patch(api, value);
         else await axios.post(api, value);
         router.back();
      } catch (error) {
         console.log(error);
      } finally {
         setLoading(false);
      }
   };

   const onDelete = async () => {
      try {
         setLoading(true);
         await axios.delete(api);
         router.back();
      } catch (error) {
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
         <div className="mt-5 p-4 w-full rounded-lg">
            <div className="flex justify-center gap-16">
               <div className="light flex mb-5 justify-center items-center gap-16 p-16 bg-background border rounded-lg">
                  <div
                     className="min-w-[100px] px-3 py-1 text-white rounded-lg capitalize font-medium flex flex-col items-center justify-center text-lg"
                     style={{
                        background: value.color,
                     }}
                  >
                     <div className="p-4">
                        <Image
                           src={String(value.logo)}
                           height={80}
                           width={80}
                           alt={"logo"}
                           className="h-12 w-12 invert grayscale-0 rounded-sm"
                        />
                     </div>
                     {value.name}
                  </div>
                  <div
                     className="pl-2 pr-3 py-1 text-white rounded-lg capitalize font-medium flex items-center"
                     style={{
                        background: value.color,
                     }}
                  >
                     <Image
                        src={String(value.logo)}
                        height={50}
                        width={50}
                        alt={"logo"}
                        className="h-5 w-5 invert grayscale-0 mr-2 rounded-sm"
                     />
                     {value.name}
                  </div>
               </div>
               <div className="dark flex mb-5 justify-center items-center gap-16 p-16 bg-background border rounded-lg">
                  <div
                     className="min-w-[100px] px-3 py-1 text-white rounded-lg capitalize font-medium flex flex-col items-center justify-center text-lg"
                     style={{
                        background: value.color,
                     }}
                  >
                     <div className="p-4">
                        <Image
                           src={String(value.logo)}
                           height={80}
                           width={80}
                           alt={"logo"}
                           className="h-12 w-12 invert grayscale-0 rounded-sm"
                        />
                     </div>
                     {value.name}
                  </div>
                  <div
                     className="pl-2 pr-3 py-1 text-white rounded-lg capitalize font-medium flex items-center"
                     style={{
                        background: value.color,
                     }}
                  >
                     <Image
                        src={String(value.logo)}
                        height={50}
                        width={50}
                        alt={"logo"}
                        className="h-5 w-5 invert grayscale-0 mr-2 rounded-sm"
                     />
                     {value.name}
                  </div>
               </div>
            </div>
            <form
               className="flex flex-col p-3 gap-3 background-parent rounded-lg"
               onSubmit={(e) => onRun(e)}
            >
               <div className="background bg-custom-accent"></div>
               {inputs.map((input) => (
                  <>
                     {input.type === "slider" && (
                        <div className="bg-foreground/10 p-3 rounded-lg">
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
                        <div className="px-4 p-3 bg-background rounded-lg">
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
                     {input.type === "url" && (
                        <div className="px-4 p-3 bg-background rounded-lg">
                           <div className="flex justify-between items-center">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                           </div>
                           <Input
                              type="url"
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
                     {input.type === "color" && (
                        <div className="px-4 p-3 rounded-lg flex justify-between items-center bg-background">
                           <div className="flex justify-between items-center">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                           </div>
                           <Input
                              type="color"
                              className="p-0 rounded-none h-8 w-8"
                              defaultValue={String(input.default) || ""}
                              name={input.name}
                              placeholder={String(input.placeholder || "")}
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
                  </>
               ))}
               <div className="flex justify-center items-center gap-3 w-full ml-auto mt-3 p-3 bg-background rounded-lg">
                  <Button className="font-semibold px-5" onClick={onReset}>
                     Reset
                  </Button>
                  <Button
                     className="font-semibold px-5"
                     type="submit"
                     disabled={loading}
                  >
                     Submit
                  </Button>
                  <Button
                     className="font-semibold px-5"
                     variant={"destructive"}
                     onClick={onDelete}
                     disabled={loading}
                  >
                     Delete
                  </Button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default EditorInput;
