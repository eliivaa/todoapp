// "use client"

// import { Pencil, Trash } from "lucide-react"

// interface TaskItemProps {
//   task: {
//     _id: string
//     title: string
//     tag?: string
//     dueDate?: string
//     // completed: boolean
//   }
//   onEdit: () => void
//   onDelete: () => void
// }

// export default function TaskItem({ task, onEdit, onDelete }: TaskItemProps) {
//   return (
//     <div className="flex justify-between items-center bg-white border p-4 rounded-xl shadow-sm mb-4">
//       <div>
//         <h3 className="text-lg font-semibold">{task.title}</h3>
//         {task.tag && (
//           <p className="text-sm text-gray-500 mt-1">
//             Category: <span className="font-medium">{task.tag}</span>
//           </p>
//         )}
//         {task.dueDate && (
//           <p className="text-sm">
//             Due:{" "}
//             <span
//               className={`font-medium px-1 rounded
//         ${new Date(task.dueDate) < new Date()
//                   ? "text-red-600 bg-red-100"
//                   : new Date(task.dueDate).toDateString() === new Date().toDateString()
//                     ? "text-green-600 bg-orange-100"
//                     : "text-green-600 bg-gray-100"
//                 }`}
//             >
//               {new Date(task.dueDate).toLocaleDateString()}
//             </span>
//             {/* <span className="text-xs text-green-600 bg-green-100 px-2 py-0.5 rounded">
//               {new Date(task.dueDate).toLocaleDateString()}
//             </span> */}
//           </p>
//         )}

//       </div>
//       <div className="flex items-center space-x-2">
//         <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
//           <Pencil size={18} />
//         </button>
//         <button onClick={onDelete} className="text-red-600 hover:text-red-800">
//           <Trash size={18} />
//         </button>
//       </div>
//     </div>
//   )
// }




"use client"

import { Pencil, Trash } from "lucide-react"

interface TaskItemProps {
  task: {
    _id: string
    title: string
    tag?: string
    dueDate?: string
    completed: boolean
  }
  onEdit: () => void
  onDelete: () => void
  onToggleComplete: (id: string) => void
  isLast: boolean
}

export default function TaskItem({
  task,
  onEdit,
  onDelete,
  onToggleComplete,
  isLast
}: TaskItemProps) {
  return (
    <div className="flex items-center bg-white border p-4 rounded-xl shadow-sm mb-4">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggleComplete(task._id)}
        className="mr-4 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
      />
      <div className="flex-1">
        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </h3>
        {task.tag && (
          <p className="text-sm text-gray-500 mt-1">
            Category: <span className="font-medium">{task.tag}</span>
          </p>
        )}
        {task.dueDate && (
          <p className="text-sm">
            Due:{" "}
            <span
              className={`font-medium px-1 rounded ${new Date(task.dueDate) < new Date()
                  ? "text-red-600 bg-red-100"
                  : new Date(task.dueDate).toDateString() === new Date().toDateString()
                    ? "text-green-600 bg-orange-100"
                    : "text-green-600 bg-gray-100"
                }`}
            >
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={onEdit} className="text-blue-600 hover:text-blue-800">
          <Pencil size={18} />
        </button>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800">
          <Trash size={18} />
        </button>
      </div>
    </div>
  )
}