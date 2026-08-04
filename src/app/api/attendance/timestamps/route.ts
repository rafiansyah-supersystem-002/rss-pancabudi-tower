import { NextRequest, NextResponse } from "next/server";
import {
  getAttendance,
  checkIn,
  checkOut,
} from "@/lib/attendance/googleSheet";

export async function GET() {
  const data = await getAttendance();

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      securityId,
      type,
      status,
      photoId,
    } = body;

    if (type === "checkin") {
      await checkIn(securityId, photoId, status);
    }

    if (type === "checkout") {
      await checkOut(securityId);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      {
        status: 400,
      }
    );
  }
}