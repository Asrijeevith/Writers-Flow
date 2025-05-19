import { connectMongo } from "../../lib/mongodb";
import { User } from "../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectMongo();

  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return Response.json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ name, email, password: hashedPassword });
  await newUser.save();

  return Response.json({ success: true, user: { name, email } });
}

