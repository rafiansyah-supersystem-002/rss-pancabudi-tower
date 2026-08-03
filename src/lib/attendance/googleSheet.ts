import { google } from "googleapis";

const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SHEET_CLIENT_EMAIL,
    key: process.env.GOOGLE_SHEET_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({
    version: "v4",
    auth,
});

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;

const EMPLOYEE_SHEET = "Security";
const ATTENDANCE_SHEET = "Attendance";
const CHECKPOINTS_SHEET = "Checkpoints";
const VISIT_SHEET = "Visits";
const OFFICEHOURS_SHEET = "Hours";

/* =========================
   EMPLOYEE
========================= */

export async function getSecurity() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${EMPLOYEE_SHEET}!A2:D`,
    });

    const rows = res.data.values ?? [];

    return rows.map((row) => ({
        id: row[0] ?? "",
        name: row[1] ?? "",
        shift: row[2] ?? "",
        position: row[3] ?? "",
    }));
}

export async function addSecurity(data: {
    id: string;
    name: string;
    shift: string;
    position: string;
}) {
    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${EMPLOYEE_SHEET}!A:D`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[data.id, data.name, data.shift, data.position]],
        },
    });

    return true;
}

export async function updateSecurity(
    id: string,
    data: {
        name: string;
        shift: string;
        position: string;
    },
) {
    const security = await getSecurity();

    const index = security.findIndex((e) => e.id === id);

    if (index === -1) throw new Error("Security not found");

    const rowNumber = index + 2;

    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${EMPLOYEE_SHEET}!A${rowNumber}:D${rowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [[id, data.name, data.shift, data.position]],
        },
    });

    return true;
}

export async function deleteSecurity(id: string) {
    // Read security
    const security = await getSecurity();

    const rowIndex = security.findIndex((e) => e.id === id);

    if (rowIndex === -1) {
        throw new Error("Security not found");
    }

    // Get spreadsheet metadata
    const spreadsheet = await sheets.spreadsheets.get({
        spreadsheetId: SPREADSHEET_ID,
    });

    const securitySheet = spreadsheet.data.sheets?.find(
        (sheet) => sheet.properties?.title === EMPLOYEE_SHEET,
    );

    if (!securitySheet || securitySheet.properties?.sheetId === undefined) {
        throw new Error("Security sheet not found");
    }

    const sheetId = securitySheet.properties.sheetId;

    // +1 because row 1 is the header
    // Google API uses zero-based indexes
    const startIndex = rowIndex + 1;
    const endIndex = startIndex + 1;

    await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SPREADSHEET_ID,
        requestBody: {
            requests: [
                {
                    deleteDimension: {
                        range: {
                            sheetId,
                            dimension: "ROWS",
                            startIndex,
                            endIndex,
                        },
                    },
                },
            ],
        },
    });

    return true;
}

/* =========================
   ATTENDANCE
========================= */

export async function getAttendance() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${ATTENDANCE_SHEET}!A2:G`,
    });

    const rows = res.data.values ?? [];

    return rows.map((row) => ({
        id: row[0] ?? "",
        securityId: row[1] ?? "",
        date: row[2] ?? "",
        checkIn: row[3] ?? "",
        checkOut: row[4] ?? "",
        status: row[5] ?? "",
        photoId: row[6] ?? "",
    }));
}

export async function checkIn(securityId: string, photoId: string) {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await getAttendance();

    const exist = attendance.find(
        (a) => a.securityId === securityId && a.date === today,
    );

    if (exist) throw new Error("Already checked in.");

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${ATTENDANCE_SHEET}!A:F`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    crypto.randomUUID(),
                    securityId,
                    today,
                    new Date().toLocaleTimeString(),
                    "",
                    "Present",
                    photoId,
                ],
            ],
        },
    });

    return true;
}

export async function checkOut(securityId: string) {
    const today = new Date().toISOString().split("T")[0];

    const attendance = await getAttendance();

    const index = attendance.findIndex(
        (a) => a.securityId === securityId && a.date === today,
    );

    if (index === -1) throw new Error("Check in not found.");

    const rowNumber = index + 2;

    await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `${ATTENDANCE_SHEET}!A${rowNumber}:F${rowNumber}`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    attendance[index].id,
                    securityId,
                    today,
                    attendance[index].checkIn,
                    new Date().toLocaleTimeString(),
                    "Present",
                ],
            ],
        },
    });

    return true;
}

export async function getCheckpoints() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${CHECKPOINTS_SHEET}!A2:C`,
    });

    const rows = res.data.values ?? [];

    return rows.map((row) => ({
        id: row[0] ?? "",
        name: row[1] ?? "",
        location: row[2] ?? "",
    }));
}
export async function visitCheckpoint(data: {
    securityId: string;
    checkpointId: string;
    evidence: string;
}) {
    const now = new Date();

    const timestamp =
        `${now.getFullYear()}-` +
        `${String(now.getMonth() + 1).padStart(2, "0")}-` +
        `${String(now.getDate()).padStart(2, "0")} ` +
        `${String(now.getHours()).padStart(2, "0")}:` +
        `${String(now.getMinutes()).padStart(2, "0")}:` +
        `${String(now.getSeconds()).padStart(2, "0")}`;

    const today = new Date().toISOString().split("T")[0];

    // today's attendance
    const attendance = await getAttendance();

    const todayAttendance = attendance.find(
        (a) => a.securityId === data.securityId && a.date === today,
    );

    if (!todayAttendance) {
        throw new Error("Please check in before visiting checkpoints.");
    }

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${VISIT_SHEET}!A2:F`,
    });

    const rows = res.data.values ?? [];

    const alreadyVisited = rows.find(
        (row) =>
            row[2] === data.securityId &&
            row[3] === data.checkpointId &&
            row[4]?.split(" ")[0] === today,
    );

    if (alreadyVisited) {
        throw new Error("Checkpoint already visited.");
    }

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: `${VISIT_SHEET}!A:F`,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [
                    crypto.randomUUID(),
                    todayAttendance.id,
                    data.securityId,
                    data.checkpointId,
                    timestamp,
                    data.evidence,
                ],
            ],
        },
    });

    return true;
}

export async function getVisits() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${VISIT_SHEET}!A2:F`,
    });

    const rows = res.data.values ?? [];

    return rows.map((row) => ({
        id: row[0] ?? "",
        attendanceId: row[1] ?? "",
        securityId: row[2] ?? "",
        checkpointId: row[3] ?? "",
        visitTime: row[4] ?? "",
        evidence: row[5] ?? "",
    }));
}


export async function getOfficeHours() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: `${OFFICEHOURS_SHEET}!A2:D`,
    });

    const rows = res.data.values ?? [];

    return rows.map((row) => ({
        startHours: row[0] ?? "",
        maxStartHours: row[1] ?? "",
        finishHours: row[2] ?? "",
        maxFinishHours: row[3] ?? "",
    }));
}