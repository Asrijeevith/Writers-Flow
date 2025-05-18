import { connectMongo } from "../../lib/mongodb";
import { Task } from "../../models/Task";
import { Write } from "../../models/Write";

export async function GET(req) {
  await connectMongo();

  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("id");

  if (!taskId) {
    return Response.json({ error: "Task ID is required" }, { status: 400 });
  }

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return Response.json({ error: "Task not found" }, { status: 404 });
    }

    // Find a matching writer
    const matchedWriter = await Write.findOne({ address: task.address });

    if (matchedWriter) {
      // Save matched writer to Task
      task.matchedWriter = matchedWriter._id;
      await task.save();

      return Response.json({ success: true, match: matchedWriter });
    }

    return Response.json({ success: false, match: null });
  } catch (error) {
    return Response.json({ error: "Server Error", details: error.message }, { status: 500 });
  }
}
