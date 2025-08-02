import mongoose from "mongoose"

declare global {
  // This extends the NodeJS Global interface for TypeScript
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
      }
    }
  }
}
