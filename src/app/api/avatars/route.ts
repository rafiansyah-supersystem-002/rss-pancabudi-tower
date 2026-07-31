import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
    const avatarDir = path.join(process.cwd(), "public/assets/images/avatar");

    try {
        const files = fs
            .readdirSync(avatarDir)
            .filter((file) => /\.(png|jpg|jpeg|webp|svg)$/i.test(file));

        return NextResponse.json(files, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to load avatars" },
            { status: 500 }
        );
    }
}
