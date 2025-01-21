import axios from "axios"

const API_URL = "https://jsonplaceholder.typicode.com/todos"

export const fetchTasks = async () => {
  const response = await axios.get(API_URL)
  return response.data.slice(0, 10).map((task: any) => ({
    id: task.id,
    title: task.title,
    status: task.completed ? "Completed" : "Pending",
    priority: ["Low", "Medium", "High"][Math.floor(Math.random() * 3)],
  }))
}

