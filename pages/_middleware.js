// user authentication to go in here if they have valid cookie
import { NextResponse } from "next/server";

export function middleware(req) {
  // extract cookies from request
  const cookies = req.cookies;

  if (Object.keys(cookies).length === 0 || !cookies["authorization"]) {
    // set placeholder cookie
  }

  return NextResponse.redirect("/auth/login");
}
