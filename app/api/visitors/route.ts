import { NextResponse } from "next/server";

// In-memory store (resets on serverless cold start)
// For production persistence, replace with Vercel KV or Redis
let totalVisitors = Math.floor(Math.random() * 5000) + 10000;
let todayVisitors = Math.floor(Math.random() * 200) + 50;
let lastReset = new Date().toDateString();

function checkAndReset() {
  const today = new Date().toDateString();
  if (today !== lastReset) {
    todayVisitors = 0;
    lastReset = today;
  }
}

export async function GET() {
  checkAndReset();
  return NextResponse.json({ today: todayVisitors, total: totalVisitors });
}

export async function POST() {
  checkAndReset();
  todayVisitors += 1;
  totalVisitors += 1;
  return NextResponse.json({ today: todayVisitors, total: totalVisitors });
}
