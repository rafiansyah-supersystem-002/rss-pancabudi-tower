export type DriveImage = {
    id: string;
    url: string;
    name: string;
};

export type ParsedMenu = DriveImage & {
    displayName: string;
    type: string;
    price: number;
    status: "AVB" | "EMP" | "UNK";
    available: boolean;
     contactNumber?: string;
    openHours?: string;
    address?: string;
};

function decodeStatus(code?: string): "AVB" | "EMP" | "UNK" {
    if (!code) return "UNK";
    const c = code.toUpperCase();
    if (c === "AVB") return "AVB";
    if (c === "EMP") return "EMP";
    return "UNK";
}

export function parseFilename(file: DriveImage): ParsedMenu {
    const base = file.name.replace(/\.[^/.]+$/, "");
    const parts = base.split("_");

    const first = parts[0]?.toUpperCase();
    if (first === "RESTO") {
        const displayName =
            parts[1]?.replace(/([a-z])([A-Z])/g, "$1 $2")?.replace(/_/g, " ") ||
            "Restaurant";

        const openHours = (() => {
            const raw = parts[3]; // "10-23"
            if (!raw) return undefined;
            const [start, end] = raw.split("-");
            if (!start || !end) return raw;
            return `${start}:00–${end}:00`;
        })();

        const contactNumber = parts[2]
            ?.replace(/([a-z])([A-Z])/g, "$1 $2")
            ?.replace(/\./g, " ")
            ?.replace(/_/g, " ");

        const address = parts[4]
            ?.replace(/([a-z])([A-Z])/g, "$1 $2")
            ?.replace(/\./g, " ")
            ?.replace(/_/g, " ");

        return {
            ...file,
            displayName,
            type: "header",
            price: 0,
            status: "UNK",
            available: true,
            contactNumber,
            openHours,
            address,
        };
    }

    const rawStatus = parts.pop(); // AVB / EMP
    const priceStr = parts.pop(); // 7000
    const type = parts.pop() || "Unknown"; // Drinks
    const rawName = parts.join("_");

    const status = decodeStatus(rawStatus);
    const available = status === "AVB";

    const price = Number(priceStr) || 0;

    const displayName = rawName
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/_/g, " ");

    return {
        ...file,
        displayName,
        type,
        price,
        status,
        available,
    };
}
