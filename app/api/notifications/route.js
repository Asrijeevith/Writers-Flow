import { connectMongo } from "../../lib/mongodb";
import { Task } from "../../models/Task";
import { Write } from "../../models/Write";

export async function GET() {
  await connectMongo();

  try {
    // Tasks with matched writers
    const taskNotifications = await Task.find({ matchedWriter: { $ne: null } }).populate("matchedWriter");

    // Writers with matched tasks (tasks with matching address)
    const writers = await Write.find();

    // For each writer find tasks matching their address
    const writerNotifications = await Promise.all(
      writers.map(async (writer) => {
        const matchedTasks = await Task.find({ address: writer.address });
        return {
          writer,
          matchedTasks,
        };
      })
    );

    return Response.json({
      success: true,
      taskNotifications,
      writerNotifications,
    });
  } catch (error) {
    return Response.json({ error: "Server Error", details: error.message }, { status: 500 });
  }
}
