import { NextRequest, NextResponse } from "next/server";
import {pool} from "@/app/db";
type Test = {
    id:number;
    title:string;
}

export const GET = async(req:NextRequest) => {
    try {
      //await pool.connect();
      const rows = await pool.query<Test>('SELECT * FROM test'); 
      return new NextResponse(JSON.stringify(rows.rows),{status:200});
    } catch (error) {
      return new NextResponse(JSON.stringify({"message":"error"}),{status:500});
    }
  }
   