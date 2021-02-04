import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import { notfound, errorHandler } from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
  res.send("API Running...")
})

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)

app.use(notfound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

app.listen(
  PORT,
  console.log(
    `Server is running at ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
)
