// src/app/dashboard/page.tsx
"use client"

import { useEffect, useState } from "react"
import MainContent from "@/components/MainContent"
import Sidebar from "@/components/Sidebar"

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

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([])

  // ✅ Fetch tasks from backend API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        const data = await res.json()
        setTasks(data)
      } catch (error) {
        console.error("Failed to load tasks", error)
      }
    }

    fetchTasks()
  }, [])

  // ✅ Handler to add a new task
  const handleAddTask = async (taskData: {
    title: string
    tag?: string
    dueDate?: string
  }) => {
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(taskData),
      })

      const newTask = await res.json()
      setTasks((prev) => [...prev, newTask])
    } catch (err) {
      console.error("Failed to add task", err)
    }
  }

  // ✅ Handler to delete task
  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      setTasks((prev) => prev.filter((task) => task._id !== id))
    } catch (err) {
      console.error("Failed to delete task", err)
    }
  }

  // ✅ Handler to edit task
  const handleEditTask = async (
    id: string,
    updatedData: { title: string; tag?: string; dueDate?: string }
  ) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      })

      const updatedTask = await res.json()
      setTasks((prev) =>
        prev.map((task) => (task._id === id ? updatedTask : task))
      )
    } catch (err) {
      console.error("Failed to edit task", err)
    }
  }

  // ✅ Handler to toggle completion
  const handleToggleComplete = async (id: string) => {
    const task = tasks.find((t) => t._id === id)
    if (!task) return

    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ completed: !task.completed }),
      })

      const updated = await res.json()
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      )
    } catch (err) {
      console.error("Failed to toggle complete", err)
    }
  }
  return (
    <div className="flex min-h-screen bg-white text-gray-900">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <MainContent
          selectedView="My Day"
          tasks={tasks} // use your task props here
          onAddTask={handleAddTask}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
          onEditTask={handleEditTask}
        />
      </div>
    </div>
  )


}
