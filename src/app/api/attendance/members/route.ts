import { NextRequest, NextResponse } from "next/server";
import {
    getSecurity,
    addSecurity,
    updateSecurity,
    deleteSecurity,
} from "@/lib/attendance/googleSheet";

// GET /api/security
export async function GET() {
    try {
        const security = await getSecurity();

        return NextResponse.json(security);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to fetch security" },
            { status: 500 },
        );
    }
}

// POST /api/security
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await addSecurity({
            id: body.id,
            name: body.name,
            shift: body.shift,
            position: body.position,
        });

        return NextResponse.json({
            message: "Security added successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to add security" },
            { status: 500 },
        );
    }
}

// PUT /api/security
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        await updateSecurity(body.id, {
            name: body.name,
            shift: body.shift,
            position: body.position,
        });

        return NextResponse.json({
            message: "Security updated successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update security" },
            { status: 500 },
        );
    }
}

// DELETE /api/security?id=EMP001
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Security ID is required" },
                { status: 400 },
            );
        }

        await deleteSecurity(id);

        return NextResponse.json({
            message: "Security deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete security" },
            { status: 500 },
        );
    }
}
