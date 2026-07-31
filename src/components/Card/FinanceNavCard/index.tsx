"use client";

import { Card, Button } from "antd";
import {
    DashboardOutlined,
    BankOutlined,
    DollarOutlined,
    GoldOutlined,
    SnippetsOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/navigation";
import React from "react";

type NavItem = {
    label: string;
    path: string;
    icon: React.ReactNode;
};

const navItems: NavItem[] = [
    {
        label: "Overview",
        path: "/finance/overview",
        icon: <DashboardOutlined />,
    },
    {
        label: "Accounts",
        path: "/finance/account",
        icon: <BankOutlined />,
    },
    {
        label: "Balance",
        path: "/finance/balance",
        icon: <DollarOutlined />,
    },
    {
        label: "Heirlooms",
        path: "/finance/heirlooms",
        icon: <GoldOutlined />,
    },
    {
        label: "History",
        path: "/finance/transactions",
        icon: <SnippetsOutlined />,
    },
];

const FinanceNavCard = () => {
    const router = useRouter();

    return (
        <Card
            variant="outlined"
            styles={{
                body: {
                    padding: "10px 8px",
                },
            }}
            style={{
                borderRadius: 16,
                height: 70,
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: 12,
                        alignItems: "center",
                    }}
                >
                    {navItems.map((item) => (
                        <div
                            key={item.path}
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: 4,
                                cursor: "pointer",
                            }}
                            onClick={() => {
                            window.location.href = item.path;
                            }}
                        >
                            <Button
                                size="middle"
                                shape="circle"
                                icon={item.icon}
                                style={{
                                    background:
                                        "linear-gradient(135deg, #6C7CF5 0%, #8FA6FF 100%)",
                                    color: "#fff",
                                    border: "none",
                                }}
                            />
                            <span style={{ fontSize: 10 }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
};

export default FinanceNavCard;
