import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import mongoose from "mongoose";

const PropertySchema = new mongoose.Schema({
  location: String,
  bhk: Number,
  availability: String,
  budget_min: Number,
  budget_max: Number,
  amenities: {
    furnished: String,
    bathroom: String,
  },
});

const Property = mongoose.models.Property || mongoose.model("Property", PropertySchema);

export async function GET(req: NextRequest) {
  await connectToDatabase();

  // Extract filters from query parameters
  const { searchParams } = new URL(req.url);
  const filters: any = {};

  if (searchParams.get("location")) {
    filters.location = searchParams.get("location");
  }
  if (searchParams.get("bhk")) {
    filters.bhk = parseInt(searchParams.get("bhk")!);
  }
  if (searchParams.get("availability")) {
    filters.availability = searchParams.get("availability");
  }
  if (searchParams.get("budget_min") && searchParams.get("budget_max")) {
    filters.budget_min = { $gte: parseInt(searchParams.get("budget_min")!) };
    filters.budget_max = { $lte: parseInt(searchParams.get("budget_max")!) };
  }
  if (searchParams.get("furnished")) {
    filters["amenities.furnished"] = searchParams.get("furnished");
  }

  try {
    const properties = await Property.find(filters);
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 });
  }
}
