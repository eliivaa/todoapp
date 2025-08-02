import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const googleAuthUrl =
    `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID}&` +
    `redirect_uri=${encodeURIComponent(process.env.GOOGLE_CALLBACK_URL!)}&` +
    `response_type=code&` +
    `scope=profile email`

  return NextResponse.redirect(googleAuthUrl)
}
