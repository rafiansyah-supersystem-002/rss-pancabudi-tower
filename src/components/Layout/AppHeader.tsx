"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Layout, Avatar, Dropdown, Typography, Grid, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header } = Layout;
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface AppHeaderProps {
    currentPageTitle: string;
    currentPageIcon: any;
    isDark: boolean;
    setIsDark: (value: boolean) => void;
    user: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phoneNumber?: string;
        roles?: string[];
        avatarId?: string;
    }; // Replace with your actual user type if available
    router: any; // Replace with proper router type if available
}

export default function AppHeader({
    currentPageTitle,
    currentPageIcon,
    isDark,
    setIsDark,
    user,
    router,
}: AppHeaderProps) {
    const userInitial = useMemo(() => {
        return user.firstName?.charAt(0)?.toUpperCase() || "?";
    }, [user.firstName]);

    const userDisplayName = useMemo(() => {
        return `${user.firstName || ""} ${user.lastName || ""}`.trim();
    }, [user.firstName, user.lastName]);

    const userFirstNameOnly = useMemo(() => {
        return user.firstName?.trim() || "User";
    }, [user.firstName]);

    const userEmail = useMemo(() => {
        return user.email || "";
    }, [user.email]);

    const userPhone = useMemo(() => {
        return user.phoneNumber || "";
    }, [user.phoneNumber]);

    const userAvatar = useMemo(() => {
        return user.avatarId || "";
    }, [user.avatarId]);

    const userRolesDisplay = useMemo(() => {
        return (
            user.roles
                ?.map(
                    (role: string) =>
                        role.charAt(0).toUpperCase() + role.slice(1),
                )
                .join(", ") || ""
        );
    }, [user.roles]);

    const screens = useBreakpoint();
    const isMobile = screens.xs;

    return (
        <div
            style={{
                background: isDark ? "#141414" : "#fff",
                borderRadius: 12,
                border: isDark ? "1px solid #333333ff" : "1px solid #f0f0f0",
                boxShadow: isDark
                    ? "0 4px 16px rgba(0,0,0,0.36)"
                    : "0 4px 16px rgba(0,0,0,0.08)",
                margin: screens.xs ? "8px 6px 6px 6px" : "12px 12px 12px 12px",
                overflow: "hidden",
            }}
        >
            <Header
                style={{
                    padding: "0 2px",
                    margin: "0 12px",
                    background: "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: screens.xs ? "48px" : "64px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                    }}
                >
                    <span style={{ fontSize: "20px", color: "#E42431" }}>
                        {currentPageIcon}
                    </span>
                    <Title
                        level={screens.xs ? 5 : 4}
                        style={{
                            margin: 0,
                            color: "#E42431",
                            textTransform: "capitalize",
                            fontSize: screens.xs ? "13px" : "18px",
                            lineHeight: screens.xs ? "20px" : "26px",
                            whiteSpace: screens.xs ? "normal" : "nowrap",
                        }}
                    >
                        {currentPageTitle}
                    </Title>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <Dropdown
                        placement="bottomRight"
                        menu={{
                            items: [
                                {
                                    type: "group",
                                    label: (
                                        <div
                                            style={{
                                                padding: isMobile
                                                    ? "4px 0px"
                                                    : "8px 0px",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: 6,
                                                }}
                                            >
                                                <Avatar
                                                    size={isMobile ? 28 : 36}
                                                    src={`/assets/images/avatar/${userAvatar}.png`}
                                                    style={{
                                                        fontSize: isMobile
                                                            ? 16
                                                            : 22,
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {/* Fallback in case image doesn't load */}
                                                    {userInitial !== "?" ? (
                                                        userInitial
                                                    ) : (
                                                        <UserOutlined />
                                                    )}
                                                </Avatar>

                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        justifyContent:
                                                            "center",
                                                        lineHeight: 1.2,
                                                    }}
                                                >
                                                    <Text
                                                        style={{
                                                            fontSize: isMobile
                                                                ? "8px"
                                                                : "12px",
                                                            fontWeight: 600,
                                                            margin: 0,
                                                            lineHeight: 1.2,
                                                            display: "block",
                                                            opacity: 0.7,
                                                        }}
                                                    >
                                                        {userDisplayName}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: isMobile
                                                                ? "8px"
                                                                : "10px",
                                                            fontWeight: 400,
                                                            lineHeight: 1.2,
                                                            display: "block",
                                                            opacity: 0.7,
                                                        }}
                                                    >
                                                        {userEmail}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: isMobile
                                                                ? "8px"
                                                                : "10px",
                                                            fontWeight: 400,
                                                            lineHeight: 1.2,
                                                            display: "block",
                                                            opacity: 0.7,
                                                        }}
                                                    >
                                                        {userPhone}
                                                    </Text>
                                                </div>
                                            </div>
                                        </div>
                                    ),
                                },

                                { type: "divider" },

                                {
                                    key: "profile",
                                    label: (
                                        <a
                                            onClick={() =>
                                                router.push("/profile")
                                            }
                                            style={{
                                                fontSize: isMobile ? 12 : 14,
                                                padding: 0,
                                            }}
                                        >
                                            Profile
                                        </a>
                                    ),
                                },
                                {
                                    key: "about",
                                    label: (
                                        <a
                                            onClick={() =>
                                                router.push("/public/about")
                                            }
                                            style={{
                                                fontSize: isMobile ? 12 : 14,
                                                padding: 0,
                                            }}
                                        >
                                            About
                                        </a>
                                    ),
                                },

                                { type: "divider" },
                            ],
                        }}
                    >
                        <Button
                            type="text"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: isMobile ? 4 : 8,
                                padding: 0,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                                // your click handler here
                                console.log("Avatar button clicked");
                            }}
                        >
                            <Avatar
                                size={isMobile ? 28 : 36}
                                src={`/assets/images/avatar/${userAvatar}.png`}
                                style={{
                                    fontSize: isMobile ? 16 : 22,
                                    textAlign: "center",
                                }}
                            >
                                {userInitial !== "?" ? (
                                    userInitial
                                ) : (
                                    <UserOutlined />
                                )}
                            </Avatar>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    textAlign: "left",
                                    lineHeight: 1.2,
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: isMobile ? "10px" : "14px",
                                        fontWeight: 600,
                                        margin: 0,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {isMobile
                                        ? userFirstNameOnly
                                        : userDisplayName}
                                </Text>

                                <Text
                                    style={{
                                        fontSize: isMobile ? "8px" : "12px",
                                        fontWeight: 400,
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {userRolesDisplay}
                                </Text>
                            </div>
                        </Button>
                    </Dropdown>
                </div>
            </Header>
        </div>
    );
}
