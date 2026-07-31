import React from "react";
import { Divider, Grid, Space, Tag, Typography } from "antd";
import { specData } from "@/lib/spec";

const { Title } = Typography;
const { useBreakpoint } = Grid;

const SpecCard = () => {
  const screens = useBreakpoint();

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
      <div
        style={{
          borderRadius: 16,
          maxWidth: screens.xs ? 640 : 1200,
          fontSize: screens.xs ? 12 : 16,
          padding: screens.xs ? 16 : 24,
          background: "#fff",
        }}
      >
     {specData.map((section, index) => {
  const Icon = section.icon;
  const isLast = index === specData.length - 1;

  return (
    <div key={section.title}>
      <Title style={{ fontSize: screens.xs ? 14 : 18 }}>
        <Icon /> {section.title}
      </Title>

      {section.tags && (
        <Space wrap style={{ marginBottom: 8 }}>
          {section.tags.map((tag) => (
            <Tag key={tag.label} color={tag.color}>
              {tag.label}
            </Tag>
          ))}
        </Space>
      )}

      {section.rows && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: screens.xs ? "150px 1fr" : "280px 1fr",
            rowGap: 6,
          }}
        >
          {section.rows.map(([k, v]) => (
            <React.Fragment key={k}>
              <li>{k}</li>
              <li>{v}</li>
            </React.Fragment>
          ))}
        </ul>
      )}

      {section.list && (
        <ul style={{ paddingLeft: 20 }}>
          {section.list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}

      {!isLast && (
     <Divider
  style={{
    borderTop: "2px solid rgba(172,172,172,0.35)",
    margin: "14px 0", 
  }}
/>
      )}
    </div>
  );
})}

      </div>
    </div>
  );
};

export default SpecCard;
