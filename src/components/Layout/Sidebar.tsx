"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Menu, Grid } from "antd";
const { useBreakpoint } = Grid;
import { MenuItems, MenuItemType } from "@/components/Layout/MenuItems";
import { AppstoreOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export function findMenuItemByPath(
    items: MenuItemType[],
    path: string
): MenuItemType | undefined {
    for (const item of items) {
        if (item.path === path) return item;
        if (item.children) {
            const found = findMenuItemByPath(item.children, path);
            if (found) return found;
        }
    }
    return undefined;
}

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    hasClicked: boolean;
    setHasClicked: (hasClicked: boolean) => void;
    isDark: boolean;
    pathname: string;
    onClick: () => void;
    setCurrentPageTitle: (title: string) => void;
    setCurrentPageIcon: (title: any) => void;
}

export default function Sidebar({
    collapsed,
    setCollapsed,
    hasClicked,
    setHasClicked,
    isDark,
    pathname,
    onClick,
    setCurrentPageTitle,
    setCurrentPageIcon,
}: SidebarProps) {
    const screens = useBreakpoint();
    const router = useRouter();
    const convertItems = (items: MenuItemType[], isChild = false): any[] => {
        return items.map((item) => ({
            key: item.path,
            // Only show icon if it's not a child
            icon: isChild ? null : item.icon,
            label: item.path ? (
                <Link href={item.path}>{item.label}</Link>
            ) : (
                item.label
            ),
            children: item.children
                ? convertItems(item.children, true) // mark children so their icons are hidden
                : undefined,
        }));
    };

    return (
        <>
            <Sider
                theme="light"
                collapsed={collapsed}
                className={collapsed ? "sider-collapsed" : "sider-expanded"}
                onCollapse={(value) => {
                    if (screens.xs) return;
                    setCollapsed(value);
                }}
                breakpoint="xs"
                collapsedWidth={screens.xs ? 46 : 60}
                style={{
                    border: isDark
                        ? "1px solid #333333ff"
                        : "1px solid #f0f0f0",
                    borderRadius: 12,
                    margin: screens.xs
                        ? "8px 0px 0px 8px"
                        : "10px 0px 0px 10px",
                    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
                    overflow: "hidden",
                    zIndex: 999,
                }}
            >
                <motion.div
                    style={{
                        height: 48,
                        marginTop: screens.xs && collapsed ? 6 : 12,
                        marginBottom: screens.xs && collapsed ? -4 : 0,
                        marginLeft: screens.xs && collapsed ? 6 : 12,
                        marginRight: screens.xs && collapsed ? 6 : 12,

                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                    }}
                    onClick={() => {
                        onClick();
                    }}
                >
                    <AnimatePresence mode="wait">
                        {collapsed ? (
                            <motion.div
                                key="collapsed"
                                initial={
                                    hasClicked
                                        ? { opacity: 0, rotateY: -90 }
                                        : false
                                }
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: 90 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{ perspective: 600 }}
                            >
                                <Image
                                    src="/assets/logo/rd_silverwood02.svg"
                                    alt="Company Logo"
                                    width={screens.xs ? 40 : 50}
                                    height={screens.xs ? 40 : 50}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="expanded"
                                initial={
                                    hasClicked
                                        ? { opacity: 0, rotateY: 90 }
                                        : false
                                }
                                animate={{ opacity: 1, rotateY: 0 }}
                                exit={{ opacity: 0, rotateY: -90 }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                                style={{ perspective: 600 }}
                            >
                                <Image
                                    src={
                                        isDark
                                            ? "/assets/logo/rd_silverwood_dark.svg"
                                            : "/assets/logo/rd_silverwood.svg"
                                    }
                                    alt="Company Logo"
                                    width={screens.xs ? 170 : 160}
                                    height={screens.xs ? 48 : 44}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[pathname]}
                    onClick={(info) => {
                        const clickedItem = findMenuItemByPath(
                            MenuItems,
                            info.key as string
                        );
                        const title =
                            clickedItem?.label || (info.key as string);
                        const icon = clickedItem?.icon || <AppstoreOutlined />;
                        setCurrentPageTitle(title);
                        setCurrentPageIcon(icon);
                        router.push(info.key as string);
                        setTimeout(() => {
                            setCollapsed(true);
                        }, 1000);
                    }}
                    items={convertItems(MenuItems)}
                    style={{
                        borderRight: "none",
                        background: "transparent",
                    }}
                />
            </Sider>
            {screens.xs && !collapsed && (
                <div
                    onClick={() => setCollapsed(true)}
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.65)", // slightly lighter so blur shows
                        backdropFilter: "blur(6px)", // main blur
                        WebkitBackdropFilter: "blur(6px)", // safari
                        zIndex: 998,
                    }}
                />
            )}
        </>
    );
}
