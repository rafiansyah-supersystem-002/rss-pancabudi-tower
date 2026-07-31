import { Grid, Tag, Typography } from "antd";
import { featureGroups } from "@/lib/feature";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const FeatureCard = () => {
    const screens = useBreakpoint();

    return (
        <div style={{ marginTop: 8, marginLeft: 8 }}>
            <div
                style={{
                    borderRadius: 16,
                    width: "459.7px",
                    maxWidth: screens.xs ? 640 : 1200,
                    padding: screens.xs ? 16 : 24,
                    background: "#fff",
                }}
            >
                {featureGroups.map((group, index) => {
                    const Icon = group.icon;

                    return (
                        <div
                            key={index}
                            style={{
                                marginBottom: screens.xs ? 12 : 20,
                            }}
                        >
                            {group.title && (
                                <Title
                                    style={{ fontSize: screens.xs ? 14 : 18 }}
                                >
                                    {Icon && <Icon />} {group.title}
                                </Title>
                            )}

                            <Tag
                                style={{
                                    fontSize: screens.xs ? 12 : 14,
                                }}
                                color={group.tagColor}
                            >
                                {group.tagLabel}
                            </Tag>

                            <ul
                                style={{
                                    paddingLeft: 20,
                                    marginTop: 2,
                                    marginBottom: 0,
                                    fontSize: screens.xs ? 12 : 14,
                                }}
                            >
                                {group.items.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FeatureCard;
