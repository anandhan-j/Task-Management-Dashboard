import type React from "react";

import TaskList from "../../components/taskList";
import ContentWrapper from "../../components/contentWrapper";

const Dashboard: React.FC = () => {
  return (
    <ContentWrapper title="Task List">
      <TaskList />
    </ContentWrapper>
  );
};

export default Dashboard;
