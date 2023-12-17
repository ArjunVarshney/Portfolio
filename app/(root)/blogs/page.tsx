import Heading from "@/components/ui/heading";
import blogData from "@/public/blog-data.json";
import BlogCard from "@/components/blogs/blog-card";

// @ts-ignore
const data: Blog[] = blogData;

const ProjectsPage = () => {
   return (
      <div className="container lg:!px-28 !pt-16 mb-12">
         <Heading title="Blogs" />
         <div className="grid lg:grid-cols-2 gap-5 mb-2 mt-8">
            {data.map((blog) => (
               <BlogCard blog={blog} key={blog.blog_url} />
            ))}
         </div>
      </div>
   );
};

export default ProjectsPage;
