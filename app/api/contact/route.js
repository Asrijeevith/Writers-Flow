import { NextResponse } from "next/server";
import { connectMongo } from "../../lib/mongodb";
import { Contact } from "../../models/Contact"; 

export async function POST(req) {
  try {
    console.log("📌 Received POST request");

    await connectMongo();
    console.log("✅ Connected to MongoDB");

    const data = await req.json();
    console.log("📌 Received data:", data);

    // ✅ Save data to MongoDB
    const newContact = new Contact(data); // Create a new Task document
    await newContact.save(); // Save it to the database
    console.log("✅ Data saved to MongoDB:", newContact);

    return NextResponse.json({ message: "Message saved", data: newContact }, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Failed to save data", details: error.message }, { status: 500 });
  }
}