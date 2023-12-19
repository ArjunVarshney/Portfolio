import { NextResponse } from "next/server";
import techData from "@/public/project-data.json";
import fs from "fs";

const tech_data_path = "E:/portfolio/public/project-data.json";

export async function GET() {
   return NextResponse.json(techData);
}

export async function POST(req: Request) {
   const data = JSON.parse(fs.readFileSync(tech_data_path).toString());
   data.push(await req.json());
   fs.writeFileSync(tech_data_path, JSON.stringify(data));
   return NextResponse.json({ result: data });
}
