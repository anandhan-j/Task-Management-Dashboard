import { Layout } from "antd";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AppHeader from "./components/AppHeader";
import { TaskProvider } from "./context/TaskContext";
import Dashboard from "./pages/Dashboard/dashboard";
import AddTaskFormPage from "./pages/addTaskForm/addTaskForm";

const { Content } = Layout;

function App() {
  return (
    <Router>
      <TaskProvider>
        <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
          <AppHeader />
          <Content>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/addTask" element={<AddTaskFormPage />} />
            </Routes>
          </Content>
        </Layout>
      </TaskProvider>
    </Router>
  );
}

export default App;
