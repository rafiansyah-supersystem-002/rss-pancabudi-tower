"use client";

import React, { useMemo } from "react";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Layout, Grid, Modal, Button, message, App } from "antd";
import { MenuItems } from "@/components/Layout/MenuItems";
import Sidebar from "@/components/Layout/Sidebar";
import AppHeader from "@/components/Layout/AppHeader";
import AppFooter from "@/components/Layout/AppFooter";
import { findMenuItemByPath } from "@/components/Layout/Sidebar"; // or move to utils
import { AppstoreOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { useBreakpoint } = Grid;

type Props = {
    children: React.ReactNode;
    isDark: boolean;
    setIsDark: (value: boolean) => void;
};

export default function MainLayout({ children, isDark, setIsDark }: Props) {
    const pathname = usePathname() || "/";
    const router = useRouter();
const user = {
  firstName: "Panca Budi",
  lastName :"",
  roles:["Tower App"],
    email: "Pancabudi Tower BSD City",
        phoneNumber: "(021) 54365555"
};
    const screens = useBreakpoint();
    const [collapsed, setCollapsed] = useState(false);
    const [hasClicked, setHasClicked] = useState(false);

    const [currentPageTitle, setCurrentPageTitle] = useState(() => {
        const item = findMenuItemByPath(MenuItems, pathname);
        return item?.label || "Dashboard";
    });
    const [currentPageIcon, setCurrentPageIcon] = useState(() => {
        const item = findMenuItemByPath(MenuItems, pathname);
        return item?.icon || <AppstoreOutlined />;
    });
    const { modal } = App.useApp();

    const handleClick = () => {
        setHasClicked(true);
        setCollapsed(!collapsed);
    };

    return (
        <>
            <Layout style={{ minHeight: screens.xs ? "120vh" : "126vh" }}>
                {/* LEFT SIDE: SIDEBAR + HEADER + CONTENT */}
                <Layout style={{ flex: 1, display: "flex" }}>
                    <Sidebar
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                        hasClicked={hasClicked}
                        setHasClicked={setHasClicked}
                        isDark={isDark}
                        pathname={pathname}
                        onClick={handleClick}
                        setCurrentPageTitle={setCurrentPageTitle}
                        setCurrentPageIcon={setCurrentPageIcon}
                    />

                    <Layout
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                        }}
                    >
                        <AppHeader
                            currentPageIcon={currentPageIcon}
                            currentPageTitle={currentPageTitle}
                            isDark={isDark}
                            setIsDark={setIsDark}
                            user={user}
                            router={router}
                        />

                        <Content
                            style={{
                                margin: screens.xs
                                    ? "0px 6px 0px 6px"
                                    : "0px 16px 0px 16px",
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                        >
                            <div
                                style={{
                                    background: isDark ? "#1f1f1f" : "#fff",
                                    padding: 8,
                                    flex: 1,
                                    borderRadius: 12,
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                                    border: isDark
                                        ? "1px solid #333"
                                        : "1px solid #f0f0f0",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                {children}
                            </div>
                        </Content>
                    </Layout>
                </Layout>

                {/* FOOTER ALWAYS AT THE BOTTOM */}
                <AppFooter isDark={isDark} />
            </Layout>
        </>
    );
}
