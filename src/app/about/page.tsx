"use client";

import {
    AppstoreOutlined,
    CloudOutlined,
    DatabaseOutlined,
    GithubOutlined,
    GlobalOutlined,
    HomeOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MessageOutlined,
    SafetyOutlined,
    ShopOutlined,
    ToolOutlined,
    XOutlined,
} from "@ant-design/icons";
import {
    Row,
    Col,
    Typography,
    Button,
    Grid,
    Card,
    Divider,
    Tag,
    Space,
    Carousel,
} from "antd";
import Image from "next/image";
import SpecCard from "@/components/Card/SpecCard";
import FeatureCard from "@/components/Card/FeatureCard";
import { teamMembers } from "@/lib/team";
import { useGsapFadeUp } from "@/hooks/gsap/useFadeUpEntrance";
import { useRef } from "react";
import { ABOUT_DETAILS } from "@/constants/silverwood-about";

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

export default function AboutPage() {
    const aboutRef = useRef<HTMLDivElement>(null);
    const screens = useBreakpoint();
    const isMobile = screens.xs;
    const aboutDetails = ABOUT_DETAILS[0];

    useGsapFadeUp(aboutRef as React.RefObject<HTMLElement>, {
        selector: ".about-line",
        y: 18,
        duration: 1.4,
        delay: 0.5,
    });

    return (
        <>
            <div
                style={{
                    padding: isMobile ? "16px 16px" : "80px 64px",
                    minHeight: "70vh",
                }}
            >
                <Row
                    align="middle"
                    gutter={[isMobile ? 0 : 32, isMobile ? 0 : 32]}
                    style={{ minHeight: isMobile ? "60vh" : "70vh" }}
                >
                    {/* LEFT: TEXT */}
                    <Col
                        xs={24}
                        md={12}
                        order={isMobile ? 2 : 1}
                        ref={aboutRef}
                    >
                        <Text
                            className="about-line"
                            strong
                            style={{
                                display: "block",
                                fontSize: isMobile ? 20 : 28,
                                marginBottom: 12,
                            }}
                        >
                            About Our Product
                        </Text>

                        <Paragraph
                            className="about-line"
                            style={{ fontSize: isMobile ? 14 : 16 }}
                        >
                            {aboutDetails}
                        </Paragraph>

                        <div className="about-line">
                            <Button
                                type="primary"
                                size={isMobile ? "middle" : "large"}
                            >
                                Learn More
                            </Button>
                        </div>
                    </Col>

                    {/* RIGHT: IMAGE */}
                    <Col
                        xs={24}
                        md={12}
                        order={isMobile ? 1 : 2}
                        style={{ textAlign: "center" }}
                    >
                        <Image
                            src="/assets/images/about/ab01-blk.png"
                            alt="About illustration"
                            width={600}
                            height={600}
                            style={{
                                maxWidth: "100%",
                                height: "auto",
                            }}
                            priority
                        />
                    </Col>
                </Row>
            </div>

            <div style={{ padding: screens.xs ? "0px 16px" : "0px 20px" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                    }}
                >
                    <Title
                        style={{
                            fontSize: screens.xs ? 14 : 20,
                            margin: 0,
                            whiteSpace: "nowrap",
                        }}
                    >
                        <GlobalOutlined /> Web Specifications
                    </Title>

                    <Divider
                        style={{
                            margin: 0,
                            flex: 1,
                            minWidth: 0,
                            borderTop: "2px solid rgba(125, 125, 125, 0.35)",
                        }}
                    />
                </div>
                <Text
                    type="secondary"
                    style={{ fontSize: screens.xs ? 12 : 16 }}
                >
                    Technical overview based on dependencies
                </Text>
            </div>

            <div style={{ padding: "0 8px" }}>
                {screens.xs ? (
                    <Card
                        styles={{
                            body: {
                                padding: 0,
                            },
                        }}
                        style={{
                            borderRadius: 16,
                            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                            maxWidth: screens.xs ? 640 : 1200,
                            fontSize: screens.xs ? 12 : 16,
                        }}
                    >
                        <Carousel
                            dots
                            arrows
                            draggable
                            infinite={false}
                            slidesToShow={1}
                            style={{ width: "100%" }}
                        >
                            <SpecCard />
                            <FeatureCard />
                        </Carousel>
                    </Card>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: 12,
                            justifyContent: "center",
                        }}
                    >
                        <Card
                            styles={{
                                body: {
                                    padding: 8,
                                },
                            }}
                            style={{
                                borderRadius: 16,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                maxWidth: screens.xs ? 640 : 1200,
                                fontSize: screens.xs ? 12 : 16,
                            }}
                        >
                            <SpecCard />
                        </Card>
                        <Card
                            styles={{
                                body: {
                                    padding: 8,
                                },
                            }}
                            style={{
                                borderRadius: 16,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                                maxWidth: screens.xs ? 640 : 1200,
                                fontSize: screens.xs ? 12 : 16,
                            }}
                        >
                            <FeatureCard />
                        </Card>
                    </div>
                )}
                <div
                    style={{
                        textAlign: "center",
                        marginTop: 12,
                        color: "#919191",
                    }}
                >
                    Swipe to see more
                </div>
            </div>

         
        </>
    );
}
