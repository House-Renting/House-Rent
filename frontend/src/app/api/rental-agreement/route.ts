import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Rental Agreement Data:", body);

  // Perform validation
  if (!body.tenantName || !body.ownerName || !body.propertyDetails || !body.terms) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  // Simulate saving to a database or blockchain
  return NextResponse.json({
    success: true,
    message: "Rental agreement submitted successfully!",
  });
}
