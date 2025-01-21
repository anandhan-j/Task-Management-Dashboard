import type React from "react"
import { Form, Input, Select, Button, message, Typography, Space } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { useTaskContext, Task } from "../context/TaskContext"
import { RollbackOutlined } from "@ant-design/icons"


const { Option } = Select
const { Title } = Typography

const AddTask: React.FC = () => {
  const { dispatch } = useTaskContext()
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = (values: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now(),
      title: values.title!,
      description: values.description,
      priority: values.priority!,
      status: "Pending",
    }

    dispatch({ type: "ADD_TASK", payload: newTask })
    message.success("Task added successfully!")
    navigate("/")
  }

  return (
    <Space direction="vertical" size="large" style={{ display: "flex" }}>
         <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", }}>
        <Link to="/">
          <Button type="primary" icon={<RollbackOutlined />}>
            Show Task List
          </Button>
        </Link>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical" style={{ maxWidth: "calc(100vw - 100px)" }}>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: "Please input the task title!" }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select the task priority!" }]}
        >
          <Select>
            <Option value="Low">Low</Option>
            <Option value="Medium">Medium</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Task
          </Button>
        </Form.Item>
      </Form>
    </Space>
  )
}

export default AddTask

