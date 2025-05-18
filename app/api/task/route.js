import { NextResponse } from "next/server";
import { connectMongo } from "../../lib/mongodb";
import { Task } from "../../models/Task";

export async function POST(req) {
  try {
    console.log("📌 Received POST request for Task");

    await connectMongo();
    console.log("✅ Connected to MongoDB");

    const data = await req.json();
    console.log("📌 Received data:", data);

    const newTask = new Task(data);
    await newTask.save();

    return NextResponse.json({ message: "Task saved", data: newTask }, { status: 201 });
  } catch (error) {
    console.error("❌ API Error:", error);
    return NextResponse.json({ error: "Failed to save task", details: error.message }, { status: 500 });
  }
}
