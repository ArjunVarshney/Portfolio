// @ts-nocheck
"use client";

import { Badge } from "@/components/ui/badge";
import Heading from "@/components/ui/heading";
import CircularProgress from "@/components/ui/spinner";
import { latexToHTML } from "@/lib/latexToHTML";
import { Blog } from "@/types";
import { Blog as BlogData } from "@/lib/generated/prisma";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, ThumbsDown, ThumbsUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { IoMdThumbsUp } from "react-icons/io";
import { toast, useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useLocalStorage from "@/hooks/use-localstorage";

const BlogsPage = ({ params }: { params: { blogUrl: string } }) => {
   const [blog, setBlog] = useState("");
   const [lastSubmitted, setLastSubmitted] = useLocalStorage<Date | undefined>(
      "lastCommentSubmitted",
      undefined
   );
   const [isViewed, setIsViewed] = useLocalStorage<Boolean>("isViewed", false);
   const [isLiked, setIsLiked] = useLocalStorage<Boolean>("isLiked", false);
   const [head, setHead] = useState<{
      title: string;
      description: string;
      featured_image: string;
      tags: string[];
      show_title: boolean;
   }>({
      title: "",
      description: "",
      featured_image: "",
      tags: [],
      show_title: false,
   });
   const [data, setData] = useState<
      BlogData & { comments: { name: string; comment: string }[] }
   >();
   const { toast } = useToast();

   const registerView = async () => {
      console.log("request sent");
      const res = await axios.post("/api/social/" + data.id, {
         action: "view",
      });
      console.log(res);
   };

   useEffect(() => {
      if (!isViewed && data) {
         registerView();
         setIsViewed(true);
      }
   }, [data]);

   useEffect(() => {
      if (typeof lastSubmitted === "string")
         setLastSubmitted(new Date(lastSubmitted));
   }, []);

   const fetchAndSetBlog = async () => {
      const data: Blog[] = (await axios.get("/blog-data.json")).data;
      const blog_data = data.filter((b) => b.blog_url === params.blogUrl)[0];

      let html = (await axios.get(blog_data.fetch_url)).data;
      let social_data = (await axios.get("/api/social/" + blog_data.id)).data;
      if (social_data.success) {
         setData(social_data.data);
      }
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");
      const paras = doc.querySelectorAll("p");
      for (let i = 0; i < paras.length; i++) {
         paras[i].innerHTML = latexToHTML(paras[i].innerText);
      }
      setBlog(doc.querySelector("html")?.innerHTML!);
      setHead(blog_data);
   };

   const isCommentDisabled =
      lastSubmitted &&
      new Date(lastSubmitted).getTime() - new Date().getTime() <
         1000 * 60 * 60 * 3;

   useEffect(() => {
      fetchAndSetBlog();
   }, []);

   return (
      <div className="relative container lg:!px-28 text-foreground">
         {data && (
            <div className="fixed right-0 top-1/2 -translate-y-1/2 border-t border-b border-l rounded-tl-3xl rounded-bl-3xl py-4 px-0.5 flex flex-col bg-background z-50">
               <Button
                  variant={"link"}
                  size={"sm"}
                  className="pt-1.5 pb-3 h-18 flex flex-col items-center group gap-0.5"
                  onClick={async () => {
                     if (isLiked) return;
                     setData(
                        (prev) =>
                           prev && {
                              ...prev,
                              likeCount: prev.likeCount + 1,
                           }
                     );
                     setIsLiked(true);
                     await axios.post("/api/social/" + data.id, {
                        action: "like",
                     });
                  }}
               >
                  {isLiked ? (
                     <IoMdThumbsUp className="w-6 h-full group-hover:scale-110 transition active:scale-100" />
                  ) : (
                     <ThumbsUp className="h-full group-hover:scale-110 transition active:scale-100" />
                  )}
                  <span className="text-xs">{data.likeCount}</span>
               </Button>
               <Separator />
               <Button
                  variant={"link"}
                  size={"sm"}
                  className="py-3 h-18 flex flex-col items-center group gap-0.5"
                  onClick={() => {
                     toast({
                        title: "You're a moron !",
                        description: "Morons are not allowed here. GTFO!",
                     });
                  }}
               >
                  <ThumbsDown className="h-full group-hover:scale-110 transition active:scale-100" />
                  <span className="text-xs">0</span>
               </Button>
               <Separator />
               <Button
                  variant={"link"}
                  size={"sm"}
                  className="pb-1.5 pt-3 h-18 flex flex-col items-center group gap-0.5"
                  onClick={() => {
                     document.querySelector("#comments")?.scrollIntoView();
                  }}
               >
                  <MessageCircle className="h-full group-hover:scale-110 transition active:scale-100" />
                  <span className="text-xs">{data?.comments.length}</span>
               </Button>
            </div>
         )}
         {blog && head ? (
            <>
               {head.show_title && (
                  <>
                     <Heading title={head.title} />
                     <div className="flex gap-1 mt-3 flex-wrap">
                        {head.tags.map((tag) => (
                           <Badge
                              key={tag}
                              variant={"outline"}
                              className="background-parent border-0"
                           >
                              {tag}
                              <div className="background bg-custom-accent !opacity-25" />
                              <div className="background bg-background/5" />
                           </Badge>
                        ))}
                     </div>
                     {data && (
                        <div className="text-sm text-primary underline underline-offset-4 mt-2">
                           {data.views} views (since{" "}
                           {new Date(data.createdAt)
                              .toDateString()
                              .substring(4)}
                           )
                        </div>
                     )}
                     <div className="pt-3 pb-5 text-base font-sans">
                        {head.description}
                     </div>
                  </>
               )}
               <Image
                  src={head.featured_image}
                  width={500}
                  height={500}
                  alt="Image"
                  className="w-full mb-5"
               />
               <div className="text-lg">
                  <div
                     className="bg-background pr-3 h-max jp-notebook"
                     dangerouslySetInnerHTML={{ __html: blog }}
                  ></div>
               </div>
            </>
         ) : (
            <div className="w-full flex items-center justify-center h-screen">
               <CircularProgress />
            </div>
         )}
         {data && (
            <div id="comments">
               <h3 className="my-4 text-2xl font-semibold">Comments</h3>
               <Separator />
               <form
                  className="mt-2 p-3 flex flex-col gap-2 border rounded"
                  onSubmit={async (e) => {
                     e.preventDefault();
                     const formData = new FormData(e.currentTarget);
                     let comment = formData.get("comment");
                     let name = formData.get("name");
                     const date = new Date();
                     if (!name)
                        name = "Moron-" + (Math.random() * 1000).toFixed(0);
                     if (!comment)
                        comment =
                           "This moron submitted the comment form without even writing a comment.";

                     setData(
                        (prev) =>
                           prev && {
                              ...prev,
                              comments: [
                                 { name, comment, date },
                                 ...prev.comments,
                              ],
                           }
                     );

                     setLastSubmitted(date);

                     await axios.post("/api/social/" + data.id, {
                        action: "comment",
                        payload: {
                           name,
                           comment,
                           date,
                        },
                     });
                  }}
               >
                  <Input type="text" placeholder="Name" name="name" />
                  <Textarea
                     className="resize-none"
                     name="comment"
                     placeholder="Comment"
                  />
                  <Button type="submit" disabled={isCommentDisabled}>
                     {isCommentDisabled
                        ? "You can only comment once every 3 hours"
                        : "Comment"}
                  </Button>
               </form>
               {data.comments.map(({ name, comment, date }, i) => (
                  <div className="p-3 border-b my-2 rounded" key={i}>
                     <span className="block text-base font-bold">
                        {name}{" "}
                        <span className="text-muted-foreground text-xs">
                           ({new Date(date).toDateString().substring(4)})
                        </span>
                     </span>
                     <span className="block text-lg">{comment}</span>
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default BlogsPage;
