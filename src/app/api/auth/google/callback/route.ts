import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import { signToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get("code")

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=no_code`)
    }

    // Exchange code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        client_secret: process.env.GOOGLE_CLIENT_SECRET!,
        code,
        grant_type: "authorization_code",
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
      }),
    })

    const tokenData = await tokenResponse.json()

    if (!tokenData.access_token) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=token_error`)
    }

    // Get user info from Google
    const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    })

    const userData = await userResponse.json()

    await dbConnect()

    let user = await User.findOne({ email: userData.email })

    if (!user) {
      user = new User({
        email: userData.email,
        password: bcrypt.hashSync("google-auth", 10),
        googleId: userData.id,
      })
      await user.save()
    }

    const token = signToken({ id: user._id.toString(), role: user.role })

    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/?token=${token}`)
  } catch (error) {
    console.error("Google OAuth error:", error)
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login?error=authentication_failed`)
  }
}
