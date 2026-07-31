import {
    AppstoreOutlined,
    HomeOutlined,
    ShopOutlined,
    SafetyOutlined,
    DeploymentUnitOutlined,
} from "@ant-design/icons";
import { SpecSection } from "@/types/spec"; // or wherever you put it

export const specData: SpecSection[] = [
    {
        title: "Specification",
        icon: AppstoreOutlined,
        rows: [
            ["Name", "RD Silverwood"],
            ["Type", "Web Application"],
            ["Developed", "Nov 10, 2025"],
            ["Framework", "Next.js"],
            ["Runtime", `React ${process.env.NEXT_PUBLIC_REACT_VERSION}`],
            ["Language", "TypeScript"],
        ],
    },
    {
        title: "Frontend Stack",
        icon: HomeOutlined,
        tags: [
            { label: "Next.js", color: "blue" },
            { label: "React", color: "cyan" },
            { label: "AntD", color: "geekblue" },
            { label: "Framer", color: "purple" },
        ],
        rows: [
            ["Framework", `Next.js ${process.env.NEXT_PUBLIC_NEXT_VERSION}`],
            ["Router", "App Router"],
            ["UI Styling", "Ant Design"],
            ["Visualizations", "Ant Charts"],
            ["Animations", "Framer Motion"],
        ],
    },
    {
        title: "State Management",
        icon: ShopOutlined,
        tags: [
            { label: "Redux", color: "green" },
            { label: "Zustand", color: "gold" },
        ],
        rows: [
            ["Global State", "Redux Toolkit"],
            ["Modular State", "Zustand"],
            ["Persistence", "localStorage"],
        ],
    },
    {
        title: "Authentication & Security",
        icon: SafetyOutlined,
        rows: [
            ["Authentication", "NextAuth.js"],
            ["Password Hashing", "bcryptjs"],
            ["Access Control", "Private & Public"],
        ],
    },
    {
        title: "Additional Features",
        icon: DeploymentUnitOutlined,
        rows: [
            ["Generative AI", "Google AI Studio"],
            ["Excel Export", "xlsx"],
            ["PDF Export", "jsPDF"],
            ["HTML Capture", "html2canvas"],
            ["File Download", "file-saver"],
            ["Google Integration ", "Google APIs"],
            ["OCR Scanner", "Tesseract.js"],
            ["QR & Barcode ", "ZXing"],
        ],
    },
];
