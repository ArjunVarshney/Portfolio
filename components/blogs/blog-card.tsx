import { Blog } from "@/types";
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }: { blog: Blog }) => {
   return (
      <a href={"/blogs/" + blog.blog_url} className="!min-w-0">
         <Link href={"/blogs/" + blog.blog_url}>
            <Card>
               <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="mb-1 flex justify-between">
                     <span className="truncate pb-0.5">{blog.title}</span>
                  </CardTitle>
                  <CardDescription className="flex gap-1 flex-wrap">
                     {blog.tags.map((tag) => (
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
                  </CardDescription>
                  <CardContent className="p-0">
                     <Image
                        src={blog.featured_image}
                        height={500}
                        width={500}
                        alt={"blog-image"}
                        className="rounded-lg mt-2 border dark:border-none aspect-video object-cover w-full"
                     />
                     <div className="flex flex-col gap-3 mt-3">
                        <div>{blog.description}</div>
                        <a href={"/blogs/" + blog.blog_url}>
                           <Link
                              href={"/blogs/" + blog.blog_url}
                              className="btn mt-3"
                           >
                              <Image
                                 src={"/icons/view.svg"}
                                 height={50}
                                 width={50}
                                 alt={"view-icon"}
                                 className="h-5 w-5 invert dark:filter-none grayscale-0 mr-2"
                              />
                              View Blog
                           </Link>
                        </a>
                     </div>
                  </CardContent>
               </CardHeader>
            </Card>
         </Link>
      </a>
   );
};

export default BlogCard;
