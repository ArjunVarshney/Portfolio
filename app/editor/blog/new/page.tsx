"use client";
import EditorInputBlog from "@/components/editor/editor-Input-blog";
import { InputType } from "@/types";

const NewBlogPage = () => {
   const techInputs: InputType[] = [
      {
         type: "text",
         name: "title",
         required: true,
      },
      {
         type: "textarea",
         name: "description",
         required: true,
      },
      {
         type: "text",
         name: "featured_image",
         required: true,
      },
      {
         type: "text",
         name: "blog_url",
         required: true,
      },
      {
         type: "text",
         name: "fetch_url",
      },
      {
         type: "text",
         name: "type",
         required: true,
      },
      {
         type: "checkbox",
         name: "show_title",
         required: true,
      },
      {
         type: "text-array",
         name: "tags",
      },
   ];

   return (
      <div className="container">
         <EditorInputBlog
            inputs={techInputs}
            api="/api/blog"
            defaults={{
               title: "Add new Title",
               description: "Add a new description to the collection",
               fetch_url: "/blogs/add-blogs.html",
               blog_url: "add-new",
               type: "html",
               show_title: true,
               featured_image: "/add-image.png",
               tags: ["add"],
            }}
         />
      </div>
   );
};

export default NewBlogPage;
