import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use("/api/products", productRoutes)

app.get("/", (req, res) => {
  res.send("API Running...")
})

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(
    `Server is running at ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
)
