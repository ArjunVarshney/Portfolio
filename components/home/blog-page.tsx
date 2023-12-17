import blogData from "@/public/blog-data.json";
import Heading from "../ui/heading";
import ProjectCard from "../projects/project-card";
import { Blog } from "@/types";
import KnowMore from "../ui/know-more-btn";
import BlogCard from "../blogs/blog-card";

// @ts-ignore
const data: Blog[] = blogData;

const BlogPage = () => {
   return (
      <div className="container lg:!px-28 my-24">
         <Heading title="Blogs" />
         <div className="grid lg:grid-cols-2 gap-5 my-8">
            {data.slice(0, 4).map((blog) => (
               <BlogCard blog={blog} key={blog.blog_url} />
            ))}
         </div>
         <KnowMore href="/projects" title="View all Blogs" />
      </div>
   );
};

export default BlogPage;
