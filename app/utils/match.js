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

export async function checkWriterMatches(writerId) {
  try {
    const res = await fetch(`/api/match?writerId=${writerId}`);
    const data = await res.json();

    if (res.ok && data.match && data.match.length > 0) {
      toast.success(`✅ Found ${data.match.length} matching tasks.`);
    } else {
      toast.error("❌ No matching tasks found for this writer.");
    }

    return data;
  } catch (error) {
    toast.error("❌ Error fetching match data.");
    console.error("Matching Error:", error);
  }
}
