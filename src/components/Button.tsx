"use client"

interface ButtonProps {
  type: "add" | "delete"
  onClick: () => void
}

export default function Button({ type, onClick }: ButtonProps) {
  const baseClasses = "text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2"

  const styles = {
    add: "bg-green-500 hover:bg-green-600 focus:ring-green-500",
    delete: "bg-red-500 hover:bg-red-600 focus:ring-red-500",
  }

  return (
    <button className={`${baseClasses} ${styles[type]}`} onClick={onClick} type="button">
      {type === "delete" ? "Delete Task" : "Add Task"}
    </button>
  )
}
