"use client"; // Required for client-side components in Next.js App Router

import React, { useMemo } from "react";
import {
    Layout,
    Card,
    Table,
    Statistic,
    Row,
    Col,
    Grid,
    Tag,
    Typography,
} from "antd";
import {
    ArrowUpOutlined,
    ArrowDownOutlined,
    UserOutlined,
    DollarOutlined,
    ExperimentOutlined,
    LockOutlined,
    DeploymentUnitOutlined,
    ScanOutlined,
    IdcardOutlined,
} from "@ant-design/icons";
import { motion, Variants } from "framer-motion";
import type { ColumnsType } from "antd/es/table";

import { useSelector } from "react-redux";
import DashboardCard from "@/components/Card/DashboardCard";
import SystemVersionCard from "@/components/Card/SystemVersionCard";
import {
    GREETINGS_HEADLINE,
    GREETINGS_SUBTITLE,
} from "@/constants/silverwood-dashboard";
import { GradualSpacing } from "@/components/Typography/Animations/GradualSpacing";
import { StaggeredFade } from "@/components/Typography/Animations/StaggeredFade";
import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Paragraph, Text } = Typography;

const { useBreakpoint } = Grid;

// Define types for data
interface DashboardData {
    key: string;
    name: string;
    value: number;
    change: number;
}

const MainLayout: React.FC = () => {
    // Sample data for the table
    const screens = useBreakpoint();
    const firstName = "Mahesa";
    const lastName = "Mahesa";

    const greetingText = useMemo(() => {
        const pick =
            GREETINGS_HEADLINE[
                Math.floor(Math.random() * GREETINGS_HEADLINE.length)
            ];

        return `${pick},${firstName ? ` ${firstName}` : ""}!`;
    }, [firstName]);

    const subtitleText = GREETINGS_SUBTITLE[0];

    const fadeUp: Variants = {
        hidden: {
            opacity: 0,
            y: 12, // less distance = softer feel
            filter: "blur(6px)",
        },
        show: (i: number) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            transition: {
                delay: 5 + i * 0.35, // keep your late start
                duration: 1.6, // softer ≠ longer, just smoother
                ease: [0.33, 1, 0.68, 1], // gentle deceleration curve
            },
        }),
    };

    return (
        <>
            <div
                style={{
                    padding: "4px 10px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Title
                    style={{
                        color: "#787878",
                        fontSize: screens.xs ? 12 : 14,
                        fontWeight: 500,
                        margin: 0,
                    }}
                >
                    Integrated Modules
                </Title>
                <div
                    style={{
                        flex: 1, // line fills remaining space
                        height: "1px", // line thickness
                        backgroundColor: "#d9d9d9", // line color
                    }}
                />
            </div>

            <motion.div variants={fadeUp} initial="hidden" animate="show">
                {" "}
                <Row gutter={[12, 12]} style={{ marginBottom: 16 }}>
                    <Col xs={12} md={6}>
                        <DashboardCard
                            title="Security"
                            subtitle="PB Tower"
                            status="ONLINE"
                            statusColor="green"
                            icon={<IdcardOutlined />}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <DashboardCard
                            title="Chambers"
                            subtitle="Rafiansyah"
                            status="ONLINE"
                            statusColor="green"
                            icon={<LockOutlined />}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <DashboardCard
                            title="Moneypulate"
                            subtitle="Rafiansyah"
                            status="ONLINE"
                            statusColor="green"
                            icon={<DollarOutlined />}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <DashboardCard
                            title="Gallery"
                            subtitle="Rafiansyah"
                            status="OFFLINE"
                            statusColor="red"
                            icon={<DeploymentUnitOutlined />}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <DashboardCard
                            title="Lenscore"
                            subtitle="Rafiansyah"
                            status="ONLINE"
                            statusColor="green"
                            icon={<ScanOutlined />}
                        />
                    </Col>
                </Row>
            </motion.div>

           
        </>
    );
};

export default MainLayout;
