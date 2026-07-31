import "./globals.css";
import { Poppins } from "next/font/google";
import AppLoadingOverlay from "@/app/layout-loading";
import ClientConditionalLayout from "@/components/Providers/AuthClientLayout";

export const metadata = {
    title: "Rafiansyah Supersystems",
    description: "Useful Multipurpose app",
};

const poppins = Poppins({
    subsets: ["latin"],
    weight: [
        "100",
        "200",
        "300",
        "400",
        "500",
        "600",
        "700",
        "800",
        "900",
    ],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={poppins.className}>
            <body>
                <AppLoadingOverlay>
                    <ClientConditionalLayout>
                        {children}
                    </ClientConditionalLayout>
                </AppLoadingOverlay>
            </body>
        </html>
    );
}