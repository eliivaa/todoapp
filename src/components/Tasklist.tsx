"use client"


import Button from "./Button"

interface Task {
  _id: string
  title: string
  completed: boolean
  user: string
  createdAt: string
  updatedAt: string
}

interface TasklistProps {
  tasks: Task[]
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export default function Tasklist({ tasks, onDelete, onToggleComplete }: TasklistProps) {
  return (
    <div className="space-y-2">
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add one above!</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <li key={task._id} className="py-3 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggleComplete(task._id)}
                  className="h-5 w-5 text-blue rounded focus:ring-blue-500"
                />
                <span className={`ml-3 ${task.completed ? "line-through text-gray-400" : "text-gray-800"}`}>
                  {task.title}
                </span>
              </div>

              <Button type="delete" onClick={() => onDelete(task._id)} />
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
