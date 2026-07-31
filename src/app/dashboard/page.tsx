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
    const firstName = "Mahesa"
    const lastName = "Mahesa"

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
            <Row gutter={[24, 24]} style={{ marginBottom: 16 }}>
                <Col span={24}>
                    <Card
                        hoverable
                        style={{
                            position: "relative",
                            borderRadius: 14,
                            overflow: "hidden",
                            background: 
                                "linear-gradient(135deg, #D9EEF6 0%, #F0F8FB 55%, #FBE9E3 100%)",

                            boxShadow: "0 6px 16px rgba(31, 79, 102, 0.18)",

                            color: "#fff",
                        }}
                        styles={{
                            body: {
                                padding: "16px",
                                height: screens.xs ? 130 : 230,
                                minHeight: screens.xs ? "auto" : 100,
                            },
                        }}
                    >
                                       {/* Background Image Layer */}
                        <div
                            style={{
                                position: "absolute",
                                inset: 0,
                                zIndex: 0,
                            }}
                        >
                            <Image
                                src={
                                   "/assets/images/dashboard/illus-light.png"
                                }
                                alt="bg"
                                fill
                                priority
                                style={{
        objectFit: "contain",
        objectPosition: "right",
    }}
                            />
                        </div>

                        {/* Content */}
                        <div
                            style={{
                                position: "relative",
                                zIndex: 1,
                                display: "flex",
                                flexDirection: "column",
                                gap: screens.xs ? 4 : 6,
                            }}
                        >
                            <GradualSpacing
                                text={greetingText}
                                style={{
                                    fontSize: screens.xs ? 16 : 20,
                                    fontWeight: 600,
                                    letterSpacing: -3.8,
                                    opacity: 0.8,
                                    color: "#3AA4CA",
                                }}
                            />

                            <StaggeredFade
                                text={subtitleText}
                                style={{
                                    fontSize: screens.xs ? 10 : 15,
                                    lineHeight: 1.4,
                                    opacity: 0.9,
                                    maxWidth: "50%",
                                                           color: "#3AA4CA",
                                    textAlign: "left",
                                }}
                            />
                        </div>
                    </Card>
                </Col>
            </Row>
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
                        fontSize: "14px",
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
                            title="Viscorion"
                            subtitle="Rafiansyah"
                            status="ONLINE"
                            statusColor="green"
                            icon={<ExperimentOutlined />}
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
                        fontSize: "14px",
                        fontWeight: 500,
                        margin: 0,
                    }}
                >
                    System Versions
                </Title>
                <div
                    style={{
                        flex: 1, // line fills remaining space
                        height: "1px", // line thickness
                        backgroundColor: "#d9d9d9", // line color
                    }}
                />
            </div>

            <Row gutter={[10, 12]} style={{ marginBottom: 16 }}>
                <Col xs={6} md={6} xl={4}>
                    <SystemVersionCard
                        title="Next.js"
                        icon="/assets/images/dashboard/logo-nextjs.png"
                        version={process.env.NEXT_PUBLIC_NEXT_VERSION}
                    />
                </Col>
                <Col xs={6} md={6} xl={4}>
                    <SystemVersionCard
                        title="React"
                        icon="/assets/images/dashboard/logo-react.png"
                        version={process.env.NEXT_PUBLIC_REACT_VERSION}
                    />
                </Col>
                <Col xs={6} md={6} xl={4}>
                    <SystemVersionCard
                        title="AntD"
                        icon="/assets/images/dashboard/logo-antd.png"
                        version={process.env.NEXT_PUBLIC_ANTD_VERSION}
                    />
                </Col>
                <Col xs={6} md={6} xl={4}>
                    <SystemVersionCard
                        title="Redux"
                        icon="/assets/images/dashboard/logo-redux.png"
                        version={process.env.NEXT_PUBLIC_REDUX_VERSION}
                    />
                </Col>
                <Col xs={6} md={6} xl={4}>
                    <SystemVersionCard
                        title="Framer"
                        icon="/assets/images/dashboard/logo-framer.png"
                        version={process.env.NEXT_PUBLIC_FRAMER_VERSION}
                    />
                </Col>
                <Col xs={6} md={6} xl={4}>
                    <SystemVersionCard
                        title="GDrive"
                        icon="/assets/images/dashboard/logo-drive.png"
                        version={process.env.NEXT_PUBLIC_GOOGLE_API_VERSION}
                    />
                </Col>
            </Row>
        </>
    );
};

export default MainLayout;
