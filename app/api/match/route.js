import { connectMongo } from "../../lib/mongodb";
import { Task } from "../../models/Task";
import { Write } from "../../models/Write";

export async function GET(req) {
  await connectMongo();

  const { searchParams } = new URL(req.url);
  const taskId = searchParams.get("id");
  const writerId = searchParams.get("writerId");

  try {
    if (taskId) {
      // Match writer for task
      const task = await Task.findById(taskId);
      if (!task) {
        return Response.json({ error: "Task not found" }, { status: 404 });
      }

      const matchedWriter = await Write.findOne({ address: task.address });
      if (matchedWriter) {
        task.matchedWriter = matchedWriter._id;
        await task.save();
        return Response.json({ success: true, match: matchedWriter });
      }
      return Response.json({ success: false, match: null });
    } 
    
    else if (writerId) {
      // Match tasks for writer
      const writer = await Write.findById(writerId);
      if (!writer) {
        return Response.json({ error: "Writer not found" }, { status: 404 });
      }

      // Find tasks with address matching writer.address
      const matchedTasks = await Task.find({ address: writer.address });

      // Optional: save matchedTask to writer? (Not doing it here to keep simple)

      return Response.json({ success: true, match: matchedTasks });
    } 
    
    else {
      return Response.json({ error: "Task ID or Writer ID is required" }, { status: 400 });
    }
  } catch (error) {
    return Response.json({ error: "Server Error", details: error.message }, { status: 500 });
  }
}
