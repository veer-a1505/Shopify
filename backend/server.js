const express = require("express")
const products = require("./data/products")
const dotenv = require("dotenv")

dotenv.config()
const app = express()

app.get("/", (req, res) => {
  res.send("API Running...")
})

app.get("/api/products", (req, res) => {
  res.json(products)
})

app.get("/api/products/:id", (req, res) => {
  const product = products.find((pdt) => pdt._id === req.params.id)
  res.json(product)
})

const PORT = process.env.PORT || 8000
app.listen(
  PORT,
  console.log(
    `Server is running at ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  )
)
