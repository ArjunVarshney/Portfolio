// @ts-nocheck
"use client";

import { Blog, InputType } from "@/types";
import { Slider } from "../ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import BlogCard from "../blogs/blog-card";
import ViewBlog from "./blog-view";
import { ScrollArea } from "../ui/scroll-area";

const EditorInputBlog = ({
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
   let defaultValue: Blog = defaults;
   const [value, setValue] = useState<Blog>(defaultValue);
   const [loading, setLoading] = useState(false);

   const onRun = async (e) => {
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
            <div className="flex items-center gap-3 mb-5">
               <div className="w-[45%]">
                  <BlogCard blog={value} />
               </div>
               <div className="w-full">
                  <ScrollArea className="h-[550px] border rounded-lg">
                     <ViewBlog defaults={value} />
                  </ScrollArea>
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
                              required={input.required || false}
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
                     {input.type === "textarea" && (
                        <div className="px-4 p-3 bg-background rounded-lg">
                           <div className="flex justify-between items-center">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                           </div>
                           <Textarea
                              defaultValue={String(input.default) || ""}
                              name={input.name}
                              placeholder={String(input.placeholder || "")}
                              className="my-2 resize-none"
                              value={String(value[input.name])}
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
                     {input.type === "checkbox" && (
                        <div className="px-4 p-3 bg-background rounded-lg">
                           <div className="flex justify-between items-center">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                              <input
                                 type="checkbox"
                                 name={input.name}
                                 className="my-2"
                                 checked={value[input.name]}
                                 onChange={() => {
                                    setValue((prev) => {
                                       const dPrev = { ...prev };
                                       dPrev[input.name] = !dPrev[input.name];
                                       return dPrev;
                                    });
                                 }}
                                 required={input.required || false}
                              />
                           </div>
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
                     {input.type === "text-array" && (
                        <div className="px-4 p-3 bg-background rounded-lg">
                           <div className="flex justify-between items-center mb-2">
                              <Label
                                 htmlFor={input.name}
                                 className="capitalize text-lg font-medium"
                              >
                                 {input.name.replaceAll("_", " ")}
                              </Label>
                           </div>
                           <TagsInput
                              // @ts-ignore
                              value={value[input.name]}
                              onChange={(tags) => {
                                 console.log(tags);
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = tags;
                                    return dPrev;
                                 });
                              }}
                              required={input.required || false}
                           />
                        </div>
                     )}
                  </>
               ))}
               <div className="flex justify-center items-center gap-3 w-full ml-auto mt-3 bg-background p-3 rounded-lg">
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

export default EditorInputBlog;
