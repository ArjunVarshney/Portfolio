import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(
   req: NextRequest,
   { params }: { params: { id: string } }
) {
   try {
      const id = Number(params.id);
      const social_data = await db.blog.findFirst({
         where: {
            id,
         },
      });
      return NextResponse.json({
         success: true,
         data: social_data,
      });
   } catch (err) {
      return NextResponse.json({
         success: false,
         error: "Some error... !",
      });
   }
}

export async function POST(
   req: NextRequest,
   { params }: { params: { id: string } }
) {
   try {
      const body = await req.json();
      const id = Number(params.id);

      const social_data = await db.blog.findFirst({
         where: {
            id,
         },
      });
      if (body.action === "like")
         await db.blog.update({
            where: {
               id,
            },
            data: {
               likeCount: {
                  increment: 1,
               },
            },
         });
      if (body.action === "comment") {
         const payload = body.payload;
         if (!payload.name)
            payload.name = "Moron-" + (Math.random() * 1000).toFixed(0);
         if (!payload.comment)
            payload.comment =
               "This moron submitted the comment form without even writing a comment.";
         await db.blog.update({
            where: {
               id,
            },
            data: {
               comments: [body.payload, ...social_data.comments],
            },
         });
      }
      if (body.action === "view") {
         await db.blog.update({
            where: {
               id,
            },
            data: {
               views: {
                  increment: 1,
               },
            },
         });
      }
      return NextResponse.json({
         success: true,
         data: social_data,
      });
   } catch (err) {
      console.log(err);
      return NextResponse.json({
         success: false,
         error: "Some error... !",
      });
   }
}
