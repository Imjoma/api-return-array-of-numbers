import { NextResponse } from "next/server";

export async function GET() {
  const numbers = [...Array(100).keys()].map((item) => item + 1);
  return NextResponse.json(numbers);
}
