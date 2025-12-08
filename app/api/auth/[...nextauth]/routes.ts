// /**
//  * WHY USE NEXTAUTH?
//  * -----------------
//  * - Handles full OAuth flow securely
//  * - Saves user data in MongoDB automatically
//  * - JWT-based session works perfectly with App Router
//  * - Google login increases user signup rate 10x
//  */

// import NextAuth from "next-auth"
// import Google from "next-auth/providers/google"
// import { MongoDBAdapter } from "@auth/mongodb-adapter"
// import client from "@/app/lib/db"

// const handler = NextAuth({
//   // WHY ADAPTER?
//   // Saves user sessions + accounts into MongoDB
//   adapter: MongoDBAdapter(client),

//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_CLIENT_ID!,     // WHY? → Secure credentials
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     })
//   ],

//   // WHY JWT?
//   // Faster, lighter and no DB call on every request
//   session: { strategy: "jwt" },
// })

// export { handler as GET, handler as POST }
