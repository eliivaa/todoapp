"use client"

import { useState } from "react"
import { Plus, Calendar } from "lucide-react"
import TaskItem from "./TaskItem"
import AddTaskModal from "./AddTaskModal"

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

interface MainContentProps {
  selectedView: string
  tasks: Task[]
  onAddTask: (taskData: { title: string; tag?: string; dueDate?: string }) => void
  onToggleComplete: (id: string) => void
  onDeleteTask: (id: string) => void
  onEditTask: (id: string, taskData: { title: string; tag?: string; dueDate?: string }) => void
}

export default function MainContent({
  selectedView,
  tasks,
  onAddTask,
  onToggleComplete,
  onDeleteTask,
  onEditTask,
}: MainContentProps) {
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const getCurrentDate = () => {
    const now = new Date()
    return now.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
    })
  }

  const handleEditClick = (task: Task) => {
    setEditingTask(task)
    setShowEditModal(true)
  }

  const handleEditSubmit = (taskData: { title: string; tag?: string; dueDate?: string }) => {
    if (editingTask) {
      onEditTask(editingTask._id, taskData)
    }
    setShowEditModal(false)
    setEditingTask(null)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto bg-card min-h-screen text-foreground shadow-md rounded-lg">
        {/* Header */}
        <div className="flex items-start justify-between p-8 pb-6">
          <div>
            <h1 className="text-3xl font-semibold mb-1">{selectedView}</h1>
            <p className="text-sm text-muted-foreground">{getCurrentDate()}</p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>New task</span>
          </button>

        </div>

        {/* Task List */}
        <div className="px-8 pb-8">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="mb-4">
                <Calendar className="w-12 h-12 text-muted-foreground mx-auto" />
              </div>
              <h3 className="text-lg font-medium mb-2">No tasks yet</h3>
              <p className="text-muted-foreground mb-6">Add a task to get started with your day</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-md hover:opacity-90 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add your first task</span>
              </button>
            </div>
          ) : (
            <div className="space-y-0">
              {tasks.map((task, index) => (
                <TaskItem
                  key={task._id}
                  task={task}
                  onToggleComplete={onToggleComplete}
                  onDelete={() => onDeleteTask(task._id)}
                  onEdit={() => handleEditClick(task)}
                  isLast={index === tasks.length - 1}
                />
              ))}
            </div>
          )}
        </div>

        {/* Add Task Modal */}
        {showAddModal && (
          <AddTaskModal
            onClose={() => setShowAddModal(false)}
            onAddTask={(taskData) => {
              onAddTask({
                title: taskData.title,
                tag: taskData.tag,
                dueDate: taskData.dueDate,
              })
            }}
          />
        )}

        {/* Edit Task Modal */}
        {showEditModal && editingTask && (
          <AddTaskModal
            onClose={() => {
              setShowEditModal(false)
              setEditingTask(null)
            }}
            onAddTask={handleEditSubmit}
            initialData={{
              title: editingTask.title,
              tag: editingTask.tag,
              dueDate: editingTask.dueDate,
            }}
            isEditing={true}
          />
        )}
      </div>
    </div>
  )
}
