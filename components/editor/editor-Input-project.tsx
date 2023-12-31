// @ts-nocheck
"use client";

import { InputType } from "@/types";
import { Slider } from "../ui/slider";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { Textarea } from "../ui/textarea";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { ScrollArea } from "../ui/scroll-area";
import ProjectCard from "../projects/project-card";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import ViewProject from "./project-view";
import MultiArrayInput from "../ui/multip-array-input";
import MultiStringObjectInput from "../ui/multip-string-object-input";
import axios from "axios";

const EditorInputProject = ({
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
   let defaultValue: Project = defaults;
   const [value, setValue] = useState<Project>(defaultValue);
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

   useEffect(() => {
      setValue(defaults);
   }, [defaults]);

   return (
      <div className="flex flex-col xl:flex-row xl:gap-5">
         <div className="mt-5 p-4 w-full rounded-lg">
            <div className="flex items-center justify-around gap-3 mb-5 w-full">
               <div className="w-[350px]">
                  {value.name && <ProjectCard project={value} />}
               </div>
               <div className="w-[70%]">
                  <ScrollArea className="h-[550px] border rounded-lg">
                     {value.name && <ViewProject defaults={value} />}
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
                     {input.type === "select" && (
                        <div className="px-4 p-3 rounded-lg flex justify-between items-center bg-background">
                           <Label
                              htmlFor={input.name}
                              className="capitalize text-lg font-medium"
                           >
                              {input.name.replaceAll("_", " ")}
                           </Label>
                           <Select
                              name={input.name}
                              defaultValue={String(input.default) || "website"}
                              onValueChange={(value) => {
                                 const curr = value;
                                 setValue((prev) => {
                                    const dPrev = { ...prev };
                                    dPrev[input.name] = curr || "";
                                    return dPrev;
                                 });
                              }}
                           >
                              <SelectTrigger className="w-[180px]">
                                 <SelectValue placeholder="Type" />
                              </SelectTrigger>
                              <SelectContent>
                                 {input.values.map((value) => (
                                    <SelectItem value={value} key={value}>
                                       {value}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
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
                              value={value[input.name] || []}
                              onChange={(tags) => {
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
                     {input.type === "inputs" && (
                        <div className="flex flex-col px-4 p-3 bg-background gap-3 rounded-lg">
                           <Label
                              htmlFor={input.name}
                              className="capitalize text-lg font-medium"
                           >
                              {input.name.replaceAll("_", " ")}
                           </Label>
                           {input.inputs.map(
                              (ip) =>
                                 ip.type === "text-array" && (
                                    <div
                                       className="px-4 p-3 bg-background rounded-lg border"
                                       key={ip.name}
                                    >
                                       <div className="flex justify-between items-center mb-2">
                                          <Label
                                             htmlFor={ip.name}
                                             className="capitalize text-lg font-medium"
                                          >
                                             {ip.name.replaceAll("_", " ")}
                                          </Label>
                                       </div>
                                       <TagsInput
                                          // @ts-ignore
                                          value={
                                             value[input.name]?.[ip.name] || []
                                          }
                                          onChange={(tags) => {
                                             setValue((prev) => {
                                                const dPrev = { ...prev };
                                                dPrev[input.name][ip.name] =
                                                   tags;
                                                return dPrev;
                                             });
                                          }}
                                          required={input.required || false}
                                       />
                                    </div>
                                 )
                           )}
                        </div>
                     )}
                     {input.type === "conditional-input" && (
                        <div className="flex-col flex gap-3">
                           {input.inputs[value[input.switch]]?.map((ip) => (
                              <>
                                 {ip.type === "text-array" && (
                                    <div className="px-4 p-3 bg-background rounded-lg border">
                                       <div className="flex justify-between items-center mb-2">
                                          <Label
                                             htmlFor={ip.name}
                                             className="capitalize text-lg font-medium"
                                          >
                                             {ip.name.replaceAll("_", " ")}
                                          </Label>
                                       </div>
                                       <TagsInput
                                          // @ts-ignore
                                          value={value[ip.name]}
                                          onChange={(tags) => {
                                             setValue((prev) => {
                                                const dPrev = { ...prev };
                                                dPrev[ip.name] = tags;
                                                return dPrev;
                                             });
                                          }}
                                          required={input.required || false}
                                       />
                                    </div>
                                 )}
                                 {ip.type === "object-string" && (
                                    <div className="px-4 p-3 bg-background rounded-lg">
                                       <div className="flex justify-between items-center">
                                          <Label
                                             htmlFor={ip.name}
                                             className="capitalize text-lg font-medium"
                                          >
                                             {ip.name.replaceAll("_", " ")}
                                          </Label>
                                       </div>
                                       <MultiStringObjectInput
                                          value={value[ip.name] || {}}
                                          onChange={(val) => {
                                             setValue((prev) => {
                                                const dPrev = { ...prev };
                                                dPrev[ip.name] = val;
                                                return dPrev;
                                             });
                                          }}
                                       />
                                    </div>
                                 )}
                                 {ip.type === "object-array" && (
                                    <div className="px-4 p-3 bg-background rounded-lg">
                                       <div className="flex justify-between items-center">
                                          <Label
                                             htmlFor={ip.name}
                                             className="capitalize text-lg font-medium"
                                          >
                                             {ip.name.replaceAll("_", " ")}
                                          </Label>
                                       </div>
                                       <MultiArrayInput
                                          value={value[ip.name] || {}}
                                          onChange={(val) => {
                                             setValue((prev) => {
                                                const dPrev = { ...prev };
                                                dPrev[ip.name] = val;
                                                return dPrev;
                                             });
                                          }}
                                       />
                                    </div>
                                 )}
                                 {ip.type === "text" && (
                                    <div className="px-4 p-3 bg-background rounded-lg">
                                       <div className="flex justify-between items-center">
                                          <Label
                                             htmlFor={ip.name}
                                             className="capitalize text-lg font-medium"
                                          >
                                             {ip.name.replaceAll("_", " ")}
                                          </Label>
                                       </div>
                                       <Input
                                          defaultValue={
                                             String(ip.default) || ""
                                          }
                                          name={ip.name}
                                          placeholder={String(
                                             ip.placeholder || ""
                                          )}
                                          className="my-2"
                                          value={[String(value[ip.name] || "")]}
                                          onChange={(e) => {
                                             const curr = e.target.value;
                                             setValue((prev) => {
                                                const dPrev = { ...prev };
                                                dPrev[ip.name] = curr || "";
                                                return dPrev;
                                             });
                                          }}
                                          required={ip.required || false}
                                       />
                                    </div>
                                 )}
                                 {ip.type === "input-input" && (
                                    <div className="px-4 p-3 bg-background rounded-lg">
                                       <div className="flex justify-between items-center">
                                          <Label
                                             htmlFor={ip.name}
                                             className="capitalize text-lg font-medium"
                                          >
                                             {ip.name.replaceAll("_", " ")}
                                          </Label>
                                       </div>
                                       <Input
                                          defaultValue={
                                             String(ip.default) || ""
                                          }
                                          name={ip.name}
                                          placeholder={String(
                                             ip.placeholder || ""
                                          )}
                                          className="my-2"
                                          value={[String(value[ip.name] || "")]}
                                          onChange={(e) => {
                                             const curr = e.target.value;
                                             setValue((prev) => {
                                                const dPrev = { ...prev };
                                                dPrev[ip.name] = curr || "";
                                                return dPrev;
                                             });
                                          }}
                                          required={ip.required || false}
                                       />
                                    </div>
                                 )}
                              </>
                           ))}
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

export default EditorInputProject;
