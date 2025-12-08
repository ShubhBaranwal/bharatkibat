// // app/lib/dbConnect.ts
// import mongoose from "mongoose";

// /**
//  * Mongoose connection handler for Next.js App Router.
//  * ---------------------------------------------------
//  * - Prevents multiple connections during hot reload
//  * - Fast reconnection when API routes are hit repeatedly
//  * - Works perfectly for serverless environment
//  *
//  * NOTE:
//  *   No authentication added as per your request.
//  */

// // const MONGODB_URI: string = process.env.MONGODB_URI || "";
// const MONGODB_URI: string = "mongodb+srv://bharatkibat9580_db_user:izPMcuv3wfns9Z@cluster0.kcbhkzl.mongodb.net/?appName=Cluster0";
// // const MONGODB_URI: string = "mongodb+srv://bharatkibat9580_db_user:izPMcuv3wfns9Z9L@cluster0.kcbhkzl.mongodb.net/";



// if (!MONGODB_URI) {
//   throw new Error(
//     "❌ MONGODB_URI is missing. Please add it in .env.local"
//   );
// }

// // Global cached variable for connection (Prevents multiple connections)
// let cached = (global as any).mongoose;

// if (!cached) {
//   cached = (global as any).mongoose = { conn: null, promise: null };
// }

// export default async function dbConnect() {
//   if (cached.conn) {
//     // Already connected → re-use same connection
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     // New connection
//     cached.promise = mongoose
//       .connect(MONGODB_URI, {
//         dbName: "bharatkibat", // ⭐ set your DB name
//         bufferCommands: false,
//       })
//       .then((mongoose) => {
//         console.log("✅ MongoDB Connected");
//         return mongoose;
//       })
//       .catch((err) => {
//         console.error("❌ MongoDB Connection Error:", err);
//         throw err;
//       });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

import mongoose from "mongoose";

// const MONGODB_URI = process.env.MONGODB_URI as string;

const MONGODB_URI: string = "mongodb+srv://bharatkibat9580_db_user:os8uigKEImDuGg4U@cluster0.kcbhkzl.mongodb.net/?appName=Cluster0";






if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI not found in .env");
}

let cached = (global as any)._mongoose;

if (!cached) {
  cached = (global as any)._mongoose = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI,{dbName:"bharatkibat"})
      .then((mongoose) => {
        console.log("✅ MongoDB Connected");
        return mongoose;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
