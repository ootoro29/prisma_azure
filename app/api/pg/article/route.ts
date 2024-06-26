import { NextRequest, NextResponse } from "next/server";
import {pool} from "@/app/db";
type Art = {
    id:number;
    title:string;
    content:string;
    writer:string;
}

export const GET = async(req:NextRequest) => {
    try {
      //await pool.connect();
      const rows = await pool.query<Art>('SELECT * FROM "Article"'); 
      return new NextResponse(JSON.stringify(rows.rows),{status:200});
    } catch (error) {
      return new NextResponse(JSON.stringify({"message":"error"}),{status:500});
    }
  }
   