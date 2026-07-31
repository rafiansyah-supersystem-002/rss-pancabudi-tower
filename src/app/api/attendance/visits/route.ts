import { NextRequest, NextResponse } from "next/server";
import { visitCheckpoint, getVisits } from "@/lib/attendance/googleSheet";

export async function GET() {
  try {
    const visits = await getVisits();

    return NextResponse.json(visits);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to load visits.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    await visitCheckpoint(body);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Visit failed.",
      },
      {
        status: 500,
      }
    );
  }
}