import { NextResponse } from "next/server";
import { getCheckpoints } from "@/lib/attendance/googleSheet";

export async function GET() {
  try {
    const checkpoints = await getCheckpoints();

    return NextResponse.json(checkpoints);
  } catch (error) {
    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Failed to load checkpoints.",
      },
      {
        status: 500,
      }
    );
  }
}