import { NextResponse } from "next/server";
import fs from "fs";

const tech_data_path = "E:/portfolio/public/tech.json";

export async function PATCH(
   req: Request,
   { params }: { params: { name: string } }
) {
   let originalData = JSON.parse(fs.readFileSync(tech_data_path).toString());
   let data = originalData.filter((d: any) => {
      return d.name.toLowerCase() !== params.name.toLowerCase();
   });
   if (JSON.stringify(data) !== JSON.stringify(originalData))
      data.push({
         ...(await req.json()),
      });
   fs.writeFileSync(tech_data_path, JSON.stringify(data));
   return NextResponse.json({ result: data });
}

export async function DELETE(
   req: Request,
   { params }: { params: { name: string } }
) {
   let originalData = JSON.parse(fs.readFileSync(tech_data_path).toString());
   let data = originalData.filter((d: any) => {
      return d.name.toLowerCase() !== params.name.toLowerCase();
   });
   fs.writeFileSync(tech_data_path, JSON.stringify(data));
   return NextResponse.json({ result: data });
}
