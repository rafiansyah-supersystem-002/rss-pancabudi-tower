import { google } from "googleapis";

export async function GET() {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    });

    const drive = google.drive({ version: "v3", auth });

    const folderId = process.env.SILVERWOOD_CHAMBERS_PRIVATE_ID;

    const files = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: "files(id,name,mimeType)",
    });

    const images =
      files.data.files?.map((file) => ({
        id: file.id,
        url: `https://drive.google.com/uc?export=view&id=${file.id}`,
        name: file.name,
      })) ?? [];

    return Response.json(images);
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to load images" }, { status: 500 });
  }
}
