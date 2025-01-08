import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  return NextResponse.json({
    success: true,
    message: "Rental agreement created!",
    data: body,
  });
}
