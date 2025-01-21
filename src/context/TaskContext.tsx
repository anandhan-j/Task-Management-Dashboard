import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"
import { message } from "antd"
import { fetchTasks } from "../services/api"

export type Task = {
  id: number
  title: string
  status: "Pending" | "Completed"
  priority: "Low" | "Medium" | "High"
  description?: string
}

type TaskState = {
  tasks: Task[]
  isLoading: boolean
  error: string | null
}

type TaskAction =
  | { type: "SET_TASKS"; payload: Task[] }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: number }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }

const TaskContext = createContext<
  | {
      state: TaskState
      dispatch: React.Dispatch<TaskAction>
    }
  | undefined
>(undefined)

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "SET_TASKS":
      return { ...state, tasks: action.payload, isLoading: false }
    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] }
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)),
      }
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      }
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false }
    default:
      return state
  }
}

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    isLoading: true,
    error: null,
  })

  useEffect(() => {
    const loadTasks = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true })
        const tasks = await fetchTasks()
        dispatch({ type: "SET_TASKS", payload: tasks })
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: "Failed to fetch tasks" })
        message.error("Failed to fetch tasks")
      }
    }

    loadTasks()
  }, [])

  return <TaskContext.Provider value={{ state, dispatch }}>{children}</TaskContext.Provider>
}

export const useTaskContext = () => {
  const context = useContext(TaskContext)
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider")
  }
  return context
}

