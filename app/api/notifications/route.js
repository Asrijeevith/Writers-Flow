import { connectMongo } from "../../lib/mongodb";
import { Task } from "../../models/Task";

export async function GET() {
  await connectMongo();

  try {
    const notifications = await Task.find({ matchedWriter: { $ne: null } }).populate("matchedWriter");
    return Response.json({ success: true, notifications });
  } catch (error) {
    return Response.json({ error: "Server Error", details: error.message }, { status: 500 });
  }
}
