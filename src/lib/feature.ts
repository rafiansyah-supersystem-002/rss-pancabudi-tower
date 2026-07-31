import {
    AppstoreOutlined,
    CloudOutlined,
    DatabaseOutlined,
    SafetyOutlined,
} from "@ant-design/icons";
import type { ComponentType } from "react";

export interface FeatureGroup {
    title?: string;
    icon?: ComponentType;
    tagColor: string;
    tagLabel: string;
    items: string[];
}

export const featureGroups: FeatureGroup[] = [
    {
        title: "Features",
        icon: AppstoreOutlined,
        tagColor: "purple",
        tagLabel: "RD Silverwood",
        items: [
            "User login and session",
            "Customizable user profile",
            "Dark & light UI theme",
            "Modern font styles",
            "Responsive Mobile design",
            "Data management by Redux",
            "Available online via Vercel",
            "No database connections",
            "Tutorial Notifications",
            "AI Integrated search features",
            "Interactive settings",
        ],
    },
    {
        icon: DatabaseOutlined,
        tagColor: "green",
        tagLabel: "RD Moneypulate",
        items: [
            "Informative Chart variants",
            "Upload and Download data",
            "Read Spreadsheet data",
        ],
    },
    {
        icon: CloudOutlined,
        tagColor: "blue",
        tagLabel: "RD Viscorion",
        items: [
            "Oil monitoring features",
            "Upload and Download data",
            "Read JSON data",
        ],
    },
    {
        icon: SafetyOutlined,
        tagColor: "yellow",
        tagLabel: "RD Chambers",
        items: [
            "Realtime photo display",
            "Google Drive integration",
            "Private & public access",
        ],
    },
    {
        icon: SafetyOutlined,
        tagColor: "cyan",
        tagLabel: "RD Lenscore",
        items: ["OCR / Text Scanner", "QR & Barcode Scanner"],
    },
    {
        icon: SafetyOutlined,
        tagColor: "pink",
        tagLabel: "RD Foodster",
        items: ["Google Drive integration", "AI Generated food details"],
    },
];
