import type React from "react";
import { useState } from "react";
import {
  Typography,
  Space,
  Input,
  Select,
  List,
  Card,
  Tag,
  Button,
  Popconfirm,
} from "antd";
import { CheckOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useTaskContext, Task } from "../context/TaskContext";

const { Title } = Typography;
const { Search } = Input;
const { Option } = Select;

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredTasks = state.tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleComplete = (task: Task) => {
    dispatch({
      type: "UPDATE_TASK",
      payload: { ...task, status: "Completed" },
    });
  };

  const handleDelete = (id: number) => {
    dispatch({ type: "DELETE_TASK", payload: id });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Low":
        return "green";
      case "Medium":
        return "orange";
      case "High":
        return "red";
      default:
        return "default";
    }
  };

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row-reverse",
        }}
      >
        <Link to="/addTask">
          <Button type="primary" icon={<PlusOutlined />}>
            Add New Task
          </Button>
        </Link>
      </div>
      <Space>
        <Search
          placeholder="Search tasks"
          onSearch={(value) => setSearchTerm(value)}
          style={{ width: 200 }}
        />
        <Select
          defaultValue="All"
          style={{ width: 120 }}
          onChange={(value) => setStatusFilter(value)}
        >
          <Option value="All">All</Option>
          <Option value="Pending">Pending</Option>
          <Option value="Completed">Completed</Option>
        </Select>
      </Space>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={filteredTasks}
        renderItem={(task) => (
          <List.Item>
            <Card
              hoverable
              style={{ width: "100%" }}
              actions={[
                task.status === "Pending" && (
                  <Button
                    type="link"
                    icon={<CheckOutlined />}
                    onClick={() => handleComplete(task)}
                  >
                    Complete
                  </Button>
                ),
                <Popconfirm
                  title="Are you sure you want to delete this task?"
                  onConfirm={() => handleDelete(task.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" danger icon={<DeleteOutlined />}>
                    Delete
                  </Button>
                </Popconfirm>,
              ].filter(Boolean)}
            >
              <Card.Meta
                title={task.title}
                description={
                  <Space direction="vertical">
                    <div>{task.description}</div>
                    <Space>
                      <Tag
                        color={task.status === "Completed" ? "green" : "gold"}
                      >
                        {task.status}
                      </Tag>
                      <Tag color={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Tag>
                    </Space>
                  </Space>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default TaskList;
