import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // defaults to auto

export async function GET(request: Request) {
  //console.log({ method: request.method });

  return NextResponse.json({
    method: "GET",
    count: 100,
  });
}

export async function POST(request: Request) {
  // console.log({ method: request.method });

  return NextResponse.json({
    method: "POST",
    count: 100,
  });
}
