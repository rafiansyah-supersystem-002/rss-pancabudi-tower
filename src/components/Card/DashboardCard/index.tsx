"use client";

import React from "react";
import { Card, Tag, Grid } from "antd";
import type { CSSProperties } from "react";

const { useBreakpoint } = Grid;

interface DashboardCardProps {
    title: string;
    subtitle?: string;
    status?: "ONLINE" | "OFFLINE";
    statusColor?: string;
    icon: React.ReactNode;
    cardStyle?: CSSProperties;
    iconStyle?: CSSProperties;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
    title,
    subtitle,
    status,
    statusColor = "green",
    icon,
    cardStyle,
    iconStyle,
}) => {
    const screens = useBreakpoint();

    return (
        <Card
            hoverable
            style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
                ...cardStyle,
            }}
            styles={{
                body: {
                    padding: screens.xs ? "8px 10px" : "10px 12px",
                    minHeight: screens.xs ? 0 : 90,
                },
            }}
        >
            {/* Background Icon */}
            <div style={{ pointerEvents: "none" }}>
                {icon &&
                    React.cloneElement(icon as any, {
                        style: {
                            position: "absolute",
                            right: screens.xs ? 8 : 12,
                            top: "50%",
                            transform: "translateY(-50%)",
                            fontSize: screens.xs ? 48 : 72,
                            opacity: 0.5,
                            color: "#6C7CF5",
                            ...iconStyle,
                        },
                    })}
            </div>

            {/* Content */}
            <div
                style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: screens.xs ? 2 : 4,
                }}
            >
                {subtitle && (
                    <span
                        style={{
                            fontSize: screens.xs ? 10 : 12,
                            fontWeight: 500,
                            opacity: 0.7,
                            lineHeight: 1.2,
                        }}
                    >
                        {subtitle}
                    </span>
                )}
                <span
                    style={{
                        fontSize: screens.xs ? 15 : 22,
                        fontWeight: 600,
                        lineHeight: 1.2,
                    }}
                >
                    {title}
                </span>
                {status && (
                    <Tag
                        color={statusColor}
                        style={{
                            fontSize: 10,
                            lineHeight: "18px",
                            padding: "0 6px",
                            width: "fit-content",
                            marginTop: 10,
                        }}
                    >
                        {status}
                    </Tag>
                )}
            </div>
        </Card>
    );
};

export default DashboardCard;
