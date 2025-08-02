import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Task from "@/lib/models/Task"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const user = verifyToken(request)

    const tasks = await Task.find({ user: user.id })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error("Error fetching tasks:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error fetching tasks" },
      { status: error instanceof Error && error.message.includes("log in") ? 401 : 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const user = verifyToken(request)
    const { title, tag, dueDate } = await request.json()

    if (!title) {
      return NextResponse.json({ message: "Title is required" }, { status: 400 })
    }

    const newTask = new Task({
      title,
      tag,
      dueDate,
      user: user.id,
    })

    await newTask.save()
    return NextResponse.json(newTask, { status: 201 })
  } catch (error) {
    console.error("Error creating task:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error creating task" },
      { status: error instanceof Error && error.message.includes("log in") ? 401 : 500 },
    )
  }
}

