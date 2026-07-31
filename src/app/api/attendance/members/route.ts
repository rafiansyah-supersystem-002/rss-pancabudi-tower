import { NextRequest, NextResponse } from "next/server";
import {
    getEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
} from "@/lib/attendance/googleSheet";

// GET /api/employees
export async function GET() {
    try {
        const employees = await getEmployees();

        return NextResponse.json(employees);
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to fetch employees" },
            { status: 500 },
        );
    }
}

// POST /api/employees
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        await addEmployee({
            id: body.id,
            name: body.name,
            department: body.department,
            position: body.position,
        });

        return NextResponse.json({
            message: "Employee added successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to add employee" },
            { status: 500 },
        );
    }
}

// PUT /api/employees
export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();

        await updateEmployee(body.id, {
            name: body.name,
            department: body.department,
            position: body.position,
        });

        return NextResponse.json({
            message: "Employee updated successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to update employee" },
            { status: 500 },
        );
    }
}

// DELETE /api/employees?id=EMP001
export async function DELETE(req: NextRequest) {
    try {
        const id = req.nextUrl.searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Employee ID is required" },
                { status: 400 },
            );
        }

        await deleteEmployee(id);

        return NextResponse.json({
            message: "Employee deleted successfully",
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { message: "Failed to delete employee" },
            { status: 500 },
        );
    }
}
