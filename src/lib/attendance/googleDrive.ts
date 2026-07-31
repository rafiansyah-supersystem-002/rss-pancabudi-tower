import { google } from "googleapis";
import { Readable } from "stream";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_DRIVE_ATTENDANCE_CLIENT_ID,
    process.env.GOOGLE_DRIVE_ATTENDANCE_CLIENT_SECRET,
);

oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_DRIVE_ATTENDANCE_REFRESH_TOKEN,
});

const drive = google.drive({
    version: "v3",
    auth: oauth2Client,
});

const FOLDER_ID = process.env.GOOGLE_DRIVE_ID!;

export async function uploadAttendancePhoto(employeeId: string, file: File) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const stream = Readable.from(buffer);
    const now = new Date();

    const pad = (n: number) => String(n).padStart(2, "0");

    const extension = file.name.split(".").pop() || "jpg";

    const fileName = `${employeeId}_${pad(now.getDate())}${pad(
        now.getMonth() + 1,
    )}${now.getFullYear()}-${pad(now.getHours())}${pad(
        now.getMinutes(),
    )}${pad(now.getSeconds())}.${extension}`;

    const response = await drive.files.create({
        requestBody: {
            name: fileName,
            parents: [FOLDER_ID],
        },
        media: {
            mimeType: file.type,
            body: stream,
        },
        fields: "id",
    });

    const fileId = response.data.id!;

    // Make image publicly viewable
    await drive.permissions.create({
        fileId,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    return {
        fileId,
        url: `https://drive.google.com/uc?export=view&id=${fileId}`,
    };
}
