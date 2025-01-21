import { Layout, Typography } from "antd";
import type React from "react";

const { Title } = Typography;
const { Content } = Layout;

type props = {
  children: React.ReactNode;
  title?: string;
};

const ContentWrapper: React.FC<props> = ({ children, title }) => {
  return (
    <>
      <Content style={{ margin: "16px", width: "calc(100vw - 50px)" }}>
        <Title level={3}>{title ?? ""}</Title>
        {children}
      </Content>
    </>
  );
};

export default ContentWrapper;
