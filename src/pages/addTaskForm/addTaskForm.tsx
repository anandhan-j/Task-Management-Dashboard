import { Layout, Typography } from "antd";
import type React from "react";

import ContentWrapper from "../../components/contentWrapper";
import AddTaskForm from "../../components/AddTaskForm";

const { Title } = Typography;

const AddTaskFormPage: React.FC = () => {
  return (
    <>
      <ContentWrapper title="Add Task">
        <AddTaskForm />
      </ContentWrapper>
    </>
  );
};

export default AddTaskFormPage;
