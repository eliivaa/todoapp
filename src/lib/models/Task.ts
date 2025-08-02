
import mongoose from "mongoose"

const TaskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    tag: { type: String },
    dueDate: { type: String },
    // completed: { type: Boolean, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
)

export default mongoose.models.Task || mongoose.model("Task", TaskSchema)
