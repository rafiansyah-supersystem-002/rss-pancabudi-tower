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
    Carousel,
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
import Link from "next/link";

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

    const images = [
        "/assets/images/dashboard/csl001.png",
        "/assets/images/dashboard/csl002.png",
        "/assets/images/dashboard/csl003.png",
    ];

    return (
        <>
            <motion.div variants={fadeUp} initial="hidden" animate="show">
                <div
                    style={{
                        width: "100%",
                        maxWidth: "100%",
                        margin: "0 auto",
                        borderRadius: screens.xs ? 12 : 16,
                        overflow: "hidden",
                    }}
                >
                    <Carousel autoplay>
                        {images.map((src, index) => (
                            <div key={index}>
                                <Image
                                    src={src}
                                    alt="Carousel Image"
                                    width={screens.xs ? 320 : 900}
                                    height={screens.xs ? 180 : 500}
                                    style={{
                                        width: "100%",
                                        height: screens.xs ? "180px" : "300px",
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div
                    style={{
                        marginTop: 10,
                        padding: "6px 4px",
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
                        Applications
                    </Title>
                    <div
                        style={{
                            flex: 1, // line fills remaining space
                            height: "1px", // line thickness
                            backgroundColor: "#d9d9d9", // line color
                        }}
                    />
                </div>

                <Row
                    gutter={[12, 12]}
                    style={{ marginTop: 0, marginBottom: 16 }}
                >
                    <Col xs={12} md={6}>
                        <Link
                            href="/attendance/timestamps"
                            style={{
                                display: "block",
                                textDecoration: "none",
                            }}
                        >
                            <DashboardCard
                                title="Security"
                                subtitle="PB Tower"
                                status="ONLINE"
                                statusColor="green"
                                icon={<IdcardOutlined />}
                            />
                        </Link>
                    </Col>
                    {/* <Col xs={12} md={6}>
                        <DashboardCard
                            title="Upcoming"
                            subtitle="PB Tower"
                            status="ONLINE"
                            statusColor="green"
                            icon={<LockOutlined />}
                        />
                    </Col> */}
                </Row>
            </motion.div>
        </>
    );
};

export default MainLayout;
