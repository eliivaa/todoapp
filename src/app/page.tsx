"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import MainContent from "@/components/MainContent"

interface Task {
  _id: string
  title: string
  completed: boolean
  user: string
  tag?: string
  dueDate?: string
  createdAt: string
  updatedAt: string
}

export default function Dashboard() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Check authentication and fetch tasks
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/login")
      return
    }

    const initializeApp = async () => {
      try {
        const response = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          if (response.status === 401) {
            localStorage.removeItem("token")
            router.push("/login")
            return
          }
          throw new Error("Failed to fetch tasks")
        }

        const data = await response.json()
        setTasks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    // Handle token from Google redirect
    const params = new URLSearchParams(window.location.search)
    const urlToken = params.get("token")
    if (urlToken) {
      localStorage.setItem("token", urlToken)
      window.history.replaceState({}, document.title, "/")
    }

    initializeApp()
  }, [router])

  const handleAddTask = async (taskData: { title: string; tag?: string; dueDate?: string }) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) throw new Error("Failed to add task")

      const createdTask = await response.json()
      setTasks([...tasks, createdTask])
    } catch (err) {
      alert("Error creating task: " + (err instanceof Error ? err.message : "Unknown error"))
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to delete task")
      }

      setTasks(tasks.filter((task) => task._id !== id))
    } catch (err) {
      alert("Error deleting task: " + (err instanceof Error ? err.message : "Unknown error"))
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to update task")
      }

      const updatedTask = await response.json()
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)))
    } catch (err) {
      alert("Error updating task: " + (err instanceof Error ? err.message : "Unknown error"))
    }
  }

  const toggleComplete = (id: string) => {
    const task = tasks.find((t) => t._id === id)
    if (task) {
      updateTask(id, { completed: !task.completed })
    }
  }

  const handleEditTask = async (id: string, taskData: { title: string; tag?: string; dueDate?: string }) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskData),
      })

      if (!response.ok) throw new Error("Failed to update task")

      const updatedTask = await response.json()
      setTasks(tasks.map((task) => (task._id === id ? updatedTask : task)))
    } catch (err) {
      alert("Error updating task: " + (err instanceof Error ? err.message : "Unknown error"))
    }
  }

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    )

  if (error)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )

  return (
    <MainContent
      selectedView="My Day"
      tasks={tasks.filter((task) => !task.completed)}
      onAddTask={handleAddTask}
      onToggleComplete={toggleComplete}
      onDeleteTask={deleteTask}
      onEditTask={handleEditTask}
    />
  )
}
