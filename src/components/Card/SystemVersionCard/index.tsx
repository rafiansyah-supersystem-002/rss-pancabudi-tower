"use client";

import { Card, Typography, Grid } from "antd";
import type { Breakpoint } from "antd/es/_util/responsiveObserver";

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

interface SystemVersionCardProps {
    title: string;
    version?: string;
    icon: string;
}

export default function SystemVersionCard({
    title,
    version,
    icon,
}: SystemVersionCardProps) {
    const screens: Partial<Record<Breakpoint, boolean>> = useBreakpoint();
    const isXs = !!screens.xs;

    return (
        <Card
            hoverable
            style={{
                position: "relative",
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
            }}
            styles={{
                body: {
                    padding: isXs ? "8px 10px" : "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                },
            }}
        >
            {/* Icon */}
            <div
                style={{
                    width: 50,
                    height: 50,
                    borderRadius: "20%",
                    background:
                        "linear-gradient(135deg, #6C7CF5 0%, #8FA6FF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 12,
                    marginLeft:-2,
                    padding: 10,
                }}
            >
                <img
                    src={icon}
                    alt={title}
                    style={{
                        width: 40,
                        height: 40,
                        objectFit: "contain",
                    }}
                />
            </div>

            {/* Title */}
            <Title
                level={5}
                style={{
                    marginBottom: 0,
                    fontSize: isXs ? 12 : 16,
                }}
            >
                {title}
            </Title>

            {/* Version */}
            {version && (
                <Text
                    type="secondary"
                    style={{
                        fontSize: isXs ? 10 : 12,
                        marginTop: -2,
                    }}
                >
                    v{version}
                </Text>
            )}
        </Card>
    );
}
