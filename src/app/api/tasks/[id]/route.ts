import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Task from "@/lib/models/Task"
import { verifyToken } from "@/lib/auth"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const user = verifyToken(request)

    const task = await Task.findOneAndDelete({
      _id: params.id,
      user: user.id,
    })

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Task deleted successfully" })
  } catch (error) {
    console.error("Error deleting task:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error deleting task" },
      { status: error instanceof Error && error.message.includes("log in") ? 401 : 500 },
    )
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect()
    const user = verifyToken(request)
    const body = await request.json()

    const task = await Task.findOneAndUpdate({ _id: params.id, user: user.id }, body, { new: true })

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    console.error("Error updating task:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error updating task" },
      { status: error instanceof Error && error.message.includes("log in") ? 401 : 500 },
    )
  }
}

import { type NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Task from "@/lib/models/Task";
import { verifyToken } from "@/lib/auth";


export async function DELETE(request: NextRequest, context: any) {
  const { params } = context;

  try {
    await dbConnect();
    const user = verifyToken(request);

    const task = await Task.findOneAndDelete({
      _id: params.id,
      user: user.id,
    });

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error deleting task" },
      { status: error instanceof Error && error.message.includes("log in") ? 401 : 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: any) {
  const { params } = context;

  try {
    await dbConnect();
    const user = verifyToken(request);
    const body = await request.json();

    const task = await Task.findOneAndUpdate(
      { _id: params.id, user: user.id },
      body,
      { new: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Error updating task" },
      { status: error instanceof Error && error.message.includes("log in") ? 401 : 500 }
    );
  }
}
