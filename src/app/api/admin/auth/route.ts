import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "Harsh@9675";
// SHA-256 hash of "Harsh@9675"
const AUTH_TOKEN = "bbf30c70edfabaa2b35e7da106ad810724e4e3baebb45049a10b2990a66d55dd";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD) {
      // Set secure HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set("admin_session", AUTH_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });

      return NextResponse.json({
        success: true,
        token: AUTH_TOKEN,
        message: "Authenticated successfully",
      });
    }

    return NextResponse.json(
      { success: false, message: "Access Denied: Invalid Security Key" },
      { status: 401 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Authentication failed" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session && session.value === AUTH_TOKEN) {
    return NextResponse.json({ authenticated: true, token: AUTH_TOKEN });
  }

  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
