import { Layout, Typography } from "antd";
import type React from "react";

const { Header } = Layout;
const { Title } = Typography;

const AppHeader: React.FC = () => {
  return (
    <Header style={{ background: "#fff", padding: "0 16px" }}>
      <Title level={3} style={{ margin: 0, lineHeight: "64px" }}>
        Task Manager
      </Title>
    </Header>
  );
};

export default AppHeader;
