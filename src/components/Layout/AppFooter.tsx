"use client";

import React from "react";
import { Layout, Space, Typography, Grid } from "antd";
import {
    GithubOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    MailOutlined,
} from "@ant-design/icons";
import Image from "next/image";

const { Footer } = Layout;
const { Text, Link } = Typography;
const { useBreakpoint } = Grid;

interface AppFooterProps {
    isDark: boolean;
}

export default function AppFooter({ isDark }: AppFooterProps) {
    const screens = useBreakpoint();
    const isXs = screens.xs;

    const textColor = isDark ? "#aaa" : "#6d6d6d";
    const mutedColor = isDark ? "#777" : "#888";
    const iconColor = isDark ? "#777" : "#7d7d7d";

    return (
        <Footer
            style={{
                margin: isXs ? 8 : 12,
                background: isDark ? "#141414" : "#fff",
                borderRadius: 12,
                border: isDark ? "1px solid #333" : "1px solid #f0f0f0",
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                padding: isXs ? "16px" : "20px",
            }}
        >
            {/* TOP CONTENT */}
            <div
                style={{
                    display: "flex",
                    flexDirection: isXs ? "column" : "row",
                    justifyContent: "space-between",
                    gap: isXs ? 16 : 32,
                }}
            >
                {/* LEFT */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: isXs ? 16 : 16,
                        maxWidth: isXs ? "100%" : "100%",
                        width: "100%",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%", // 👈 take full width
                            justifyContent: "space-between", // 👈 spread left & right
                            alignItems: "center",
                            textAlign: isXs ? "left" : "right",
                        }}
                    >
                        <Image
                            src={
                                isDark
                                    ? "/assets/logo/pb_logo01.svg"
                                    : "/assets/logo/pb_logo01.svg"
                            }
                            alt="Logo"
                            width={isXs ? 88 : 130}
                            height={isXs ? 32 : 46}
                        />

                        {/* SOCIALS */}
                        <Space size={12}>
                            <GithubOutlined
                                style={{
                                    fontSize: isXs ? 20 : 24,
                                    color: iconColor,
                                }}
                            />
                            <TwitterOutlined
                                style={{
                                    fontSize: isXs ? 20 : 24,
                                    color: iconColor,
                                }}
                            />
                            <LinkedinOutlined
                                style={{
                                    fontSize: isXs ? 20 : 24,
                                    color: iconColor,
                                }}
                            />
                            <MailOutlined
                                style={{
                                    fontSize: isXs ? 20 : 24,
                                    color: iconColor,
                                }}
                            />
                        </Space>
                    </div>
                    {/* RIGHT */}
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: isXs ? 14 : 10,
                            justifyContent: "left",
                            textAlign: isXs ? "left" : "right",
                        }}
                    >
                        <Link
                            style={{
                                color: textColor,
                                fontSize: isXs ? 12 : 16,
                                fontWeight: 600,
                            }}
                        >
                            About
                        </Link>
                        <Link
                            style={{
                                color: textColor,
                                fontSize: isXs ? 12 : 16,
                                fontWeight: 600,
                            }}
                        >
                            Projects
                        </Link>
                        <Link
                            style={{
                                color: textColor,
                                fontSize: isXs ? 12 : 16,
                                fontWeight: 600,
                            }}
                        >
                            Blog
                        </Link>
                        <Link
                            style={{
                                color: textColor,
                                fontSize: isXs ? 12 : 16,
                                fontWeight: 600,
                            }}
                        >
                            Contact
                        </Link>
                    </div>

                    {isXs ? (
                        <Text
                            style={{
                                fontSize: isXs ? 12 : 16,
                                color: mutedColor,
                                marginTop: -8,
                                textAlign: "left",
                            }}
                        >
                            <span style={{ fontWeight: 500 }}>
                                Silverwood Technologies
                            </span>{" "}
                            Master App is an unofficial portfolio web
                            application by{" "}
                            <span style={{ fontWeight: 500 }}>
                                Mahesa Rafiansyah
                            </span>
                            , featuring projects built with modern React.js
                            technology, specifically Next.js, focused on refined
                            user experience.
                        </Text>
                    ) : (
                        <Text
                            style={{
                                width: isXs ? "100%" : "90%",
                                fontSize: isXs ? 12 : 16,
                                color: mutedColor,
                                marginTop: -8,
                                textAlign: "left",
                            }}
                        >
                            <span style={{ fontWeight: 500 }}>
                                Silverwood Technologies
                            </span>{" "}
                            Master App is an unofficial portfolio web
                            application created by Mahesa Rafiansyah,
                            integrating Rafiansyah Design and its custom-built
                            projects. Each project under Rafiansyah Design is
                            developed using modern, up-to-date React.js
                            technologies—specifically Next.js—with a strong
                            focus on performance, structure, and refined user
                            experience.
                        </Text>
                    )}
                </div>
            </div>

            {/* BOTTOM */}
            <div
                style={{
                    marginTop: isXs ? 12 : 18,
                    textAlign: isXs ? "center" : "left",
                }}
            >
                <Text style={{ fontSize: isXs ? 10 : 14, color: mutedColor }}>
                    © 2026 Rafiansyah Silverwood. All rights reserved.
                </Text>
            </div>
        </Footer>
    );
}
