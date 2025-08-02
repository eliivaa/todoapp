import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import { signToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password } = await request.json()

    const user = await User.findOne({ email })
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return NextResponse.json({ message: "Wrong email or password" }, { status: 401 })
    }

    const token = signToken({ id: user._id.toString(), role: user.role })

    return NextResponse.json({
      token,
      message: "Login successful",
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Error during login" }, { status: 500 })
  }
}
