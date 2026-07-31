"use client";

import MainLayout from "@/components/Layout/MainLayout";
import { usePathname } from "next/navigation";
import { ConfigProvider, App as AntdApp } from "antd";
import type { ThemeConfig } from "antd";
import { motion, AnimatePresence } from "framer-motion";
import { SILVERWOOD_EXCLUDED_LAYOUT_ROUTES } from "@/constants/silverwood-excluded-routes";

export default function ClientConditionalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    const currentTheme: ThemeConfig = {
        token: {
            colorText: "#6d6d6dff",
            fontFamily: "Poppins, sans-serif",
        },
    };

    const isExcluded = SILVERWOOD_EXCLUDED_LAYOUT_ROUTES.some((route) =>
        pathname.startsWith(route),
    );

    const isDark = false;

    const setIsDark = (_value: boolean) => {
        // no-op
    };

    return (
        <ConfigProvider theme={currentTheme}>
            <AntdApp>
                {isExcluded ? (
                    children
                ) : (
                    <AnimatePresence mode="wait">
                        <motion.div
                            key="default"
                            initial={{ opacity: 0, filter: "blur(10px)" }}
                            animate={{ opacity: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.65, ease: "easeOut" }}
                        >
                            <MainLayout isDark={isDark} setIsDark={setIsDark}>
                                {children}
                            </MainLayout>
                        </motion.div>
                    </AnimatePresence>
                )}
            </AntdApp>
        </ConfigProvider>
    );
}
