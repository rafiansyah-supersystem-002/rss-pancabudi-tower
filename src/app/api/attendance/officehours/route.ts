import {  NextResponse } from "next/server";
import { getOfficeHours } from "@/lib/attendance/googleSheet";

export async function GET() {
  try {
    const officeHours = await getOfficeHours();

    return NextResponse.json(officeHours);
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
