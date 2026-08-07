"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Menu, Grid, Button } from "antd";
const { useBreakpoint } = Grid;
import {
    MenuItems,
    MenuItemType,
} from "@/components/Layout/MenuItems";
import {
    AppstoreOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;

export function findMenuItemByPath(
    items: MenuItemType[],
    path: string,
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

    const [sidebarHidden, setSidebarHidden] = useState(false);
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

    const menuItems = [
        ...(collapsed
            ? [
                  {
                      key: "__toggle_sidebar__",
                      icon: (
                          <Button
                              type="text"
                              shape="circle"
                              icon={
                                  sidebarHidden ? (
                                      <MenuUnfoldOutlined />
                                  ) : (
                                      <MenuFoldOutlined />
                                  )
                              }
                              onClick={(e) => {
                                  e.stopPropagation();
                                  setSidebarHidden((prev) => !prev);
                              }}
                              style={{marginLeft:-8}}
                          />
                      ),
                      label: (
                          <span onClick={() => setSidebarHidden(true)}>
                              Hide Sidebar
                          </span>
                      ),
                  },
              ]
            : []),
        ...convertItems(MenuItems),
    ];


    return (
        <>
            <AnimatePresence>
                {!sidebarHidden && (
                    <motion.div
                        initial={
                            !sidebarHidden ? { opacity: 0, x: -30 } : false
                        }
                        animate={!sidebarHidden ? { opacity: 1, x: 0 } : {}}
                        exit={{
                            width: 0,
                            opacity: 0,
                            x: -30,
                        }}
                        transition={{
                            duration: 0.35,
                            ease: "easeInOut",
                        }}
                    >
                        <Sider
                            theme="light"
                            collapsed={collapsed}
                            className={
                                collapsed ? "sider-collapsed" : "sider-expanded"
                            }
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
                                height: "calc(100% - 8px)",
                            }}
                        >
                            <motion.div
                                style={{
                                height: screens.xs? 58:68,
                        marginTop: screens.xs && collapsed ? 6 : 12,
                        marginBottom: screens.xs && collapsed ? -12 : -4,
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
                                                    ? {
                                                          opacity: 0,
                                                          rotateY: -90,
                                                      }
                                                    : false
                                            }
                                            animate={{
                                                opacity: 1,
                                                rotateY: 0,
                                                scale: [1, 1.08, 1, 1, 1],
                                            }}
                                            exit={{ opacity: 0, rotateY: 90 }}
                                            transition={{
                                                opacity: { duration: 0.5 },
                                                rotateY: {
                                                    duration: 0.5,
                                                    ease: "easeOut",
                                                },
                                                scale: {
                                                    duration: 4,
                                                    times: [
                                                        0, 0.15, 0.3, 0.8, 1,
                                                    ],
                                                    repeat: Infinity,
                                                    ease: "easeInOut",
                                                },
                                            }}
                                            style={{
                                                perspective: 600,
                                            }}
                                        >
                                            <Image
                                                src="/assets/logo/pb_logo02.svg"
                                                alt="Company Logo"
                                                width={screens.xs ? 30 :40}
                                    height={screens.xs ? 30 : 40}
                                            />

                                            <motion.div
                                                animate={{
                                                    x: [
                                                        "-150%",
                                                        "-150%",
                                                        "250%",
                                                        "250%",
                                                    ],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    times: [0, 0.3, 0.55, 1],
                                                    repeat: Infinity,
                                                    ease: "linear",
                                                }}
                                                style={{
                                                    position: "absolute",
                                                    inset: 0,
                                                    width: "35%",
                                                    height: "180%",
                                                    background:
                                                        "linear-gradient(90deg, transparent, rgba(255,255,255,.9), transparent)",
                                                    transform: "skewX(-20deg)",
                                                    pointerEvents: "none",
                                                    mixBlendMode: "screen",
                                                }}
                                            />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="expanded"
                                            initial={
                                                hasClicked
                                                    ? {
                                                          opacity: 0,
                                                          rotateY: 90,
                                                      }
                                                    : false
                                            }
                                            animate={{ opacity: 1, rotateY: 0 }}
                                            exit={{ opacity: 0, rotateY: -90 }}
                                            transition={{
                                                duration: 0.5,
                                                ease: "easeOut",
                                            }}
                                            style={{ perspective: 600 }}
                                        >
                                            <Image
                                    src={
                                        isDark
                                            ? "/assets/logo/pb_logo01.svg"
                                            : "/assets/logo/pb_logo01.svg"
                                    }
                                    alt="Company Logo"
                                    width={screens.xs ? 160 : 160}
                                    height={screens.xs ? 60 : 60}
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
                                        info.key as string,
                                    );
                                    const title =
                                        clickedItem?.label ||
                                        (info.key as string);
                                    const icon = clickedItem?.icon || (
                                        <AppstoreOutlined />
                                    );
                                    setCurrentPageTitle(title);
                                    setCurrentPageIcon(icon);
                                    router.push(info.key as string);
                                    setTimeout(() => {
                                        setCollapsed(true);
                                    }, 1000);
                                }}
                                items={menuItems}
                                style={{
                                    borderRight: "none",
                                    background: "transparent",
                                }}
                            />
                        </Sider>
                    </motion.div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {sidebarHidden && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -20,
                            scale: 0.8,
                        }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            scale: 1,
                        }}
                        exit={{
                            opacity: 0,
                            x: -20,
                            scale: 0.8,
                        }}
                        transition={{
                            duration: 0.25,
                            ease: "easeOut",
                        }}
                        style={{
                            position: "fixed",
                            top: 40,
                            left: 0,
                            zIndex: 1200,
                        }}
                    >
                        <Button
                            type="primary"
                            icon={<MenuUnfoldOutlined />}
                            onClick={() => setSidebarHidden(false)}
                            style={{
                                width: 36,
                                height: 36,
                                background: isDark ? "#333" : "#fff",
                                color: isDark ? "#fff" : "#6C7Cf5",
                                fontSize: 16,
                                boxShadow: "0 8px 24px rgba(0,0,0,.2)",
                            }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
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
