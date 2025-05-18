import { NextResponse } from "next/server";
import { connectMongo } from "../../lib/mongodb";
import { Write } from "../../models/Write";

export async function POST(req) {
  try {
    console.log("📌 Received POST request for Writer");

    await connectMongo();
    console.log("✅ Connected to MongoDB");

    const data = await req.json();
    console.log("📌 Received data:", data);

    const newWrite = new Write(data);
    await newWrite.save();

    return NextResponse.json({ message: "Writer saved successfully", data: newWrite }, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Failed to save writer", details: error.message }, { status: 500 });
  }
}

