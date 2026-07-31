import { NextRequest, NextResponse } from "next/server";
import { uploadAttendancePhoto } from "@/lib/attendance/googleDrive";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const photo = formData.get("photo") as File | null;
    const employeeId = formData.get("employeeId") as string;

    if (!photo) {
      return NextResponse.json(
        {
          message: "Photo is required.",
        },
        {
          status: 400,
        }
      );
    }

    const result = await uploadAttendancePhoto(employeeId, photo);

    return NextResponse.json({
      success: true,
      fileId: result.fileId,
      url: result.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message:
          error instanceof Error
            ? error.message
            : "Upload failed.",
      },
      {
        status: 500,
      }
    );
  }
}