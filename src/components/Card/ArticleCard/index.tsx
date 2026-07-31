"use client";

import { Card, Typography, Tag, Row, Col, Grid } from "antd";
import { FC } from "react";
import Image from "next/image";

const { Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

interface ArticleCardProps {
    title: string;
    description: string;
    imageUrl: string;
    tags?: string[];
    onClick?: () => void;
}

const ArticleCard: FC<ArticleCardProps> = ({ title, description, imageUrl, tags = [], onClick }) => {
    const screens = useBreakpoint();
    const isXs = screens.xs;

    return (
        <Card
            hoverable
            onClick={onClick}
            style={{
                width: "100%",
                borderRadius: 16,
                overflow: "auto",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                transition: "transform 0.3s, box-shadow 0.3s",
                padding: 0,
            }}
            bodyStyle={{ padding: "0px 16px" }}
        >
            <Row gutter={16} align="middle" wrap={true} style={{ flexDirection: isXs ? "row" : "row" }}>
                <Col flex="1" style={{ display: "flex", flexDirection: "column", marginTop: isXs ? 12 : 0 }}>
                    <Text strong style={{ fontSize: isXs? 12: 16, marginBottom: 2 }} ellipsis={{ tooltip: title }}>
                        {title}
                    </Text>
                        <div style={{ marginTop: "auto", display: "flex", flexWrap: "wrap", gap: 4 }}>
                        {tags.map((tag) => (
                            <Tag key={tag} color="blue">
                                {tag}
                            </Tag>
                        ))}
                    </div>
                    <Paragraph style={{  fontSize: isXs? 10: 16, marginBottom: 8 }} ellipsis={{ rows: 5, tooltip: description }}>
                        {description}
                    </Paragraph>
                
                </Col>
            </Row>
        </Card>
    );
};

export default ArticleCard;
