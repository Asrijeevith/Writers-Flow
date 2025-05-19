import { connectMongo } from "../../lib/mongodb";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    await connectMongo();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return Response.json({ error: "Invalid credentials" }, { status: 401 });
    }

    // If needed: generate a token or return the user info
    return Response.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
