import { toast } from "react-hot-toast";

export async function checkMatch(taskId) {
  try {
    const res = await fetch(`/api/match?id=${taskId}`);
    const data = await res.json();

    if (res.ok && data.match) {
      toast.success("✅ Match found! Task assigned.");
    } else {
      toast.error("❌ No matching writer found.");
    }

    return data;
  } catch (error) {
    toast.error("❌ Error fetching match data.");
    console.error("Matching Error:", error);
  }
}
