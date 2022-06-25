import express from 'express'
import mongoose from 'mongoose'
import router from './routes/routes.js'
import cors from 'cors'
import bodyParser from 'body-parser'

const PORT = process.env.PORT || 5000
const DATABASE_URL = process.env.DATABASE_URL

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(router)

async function start() {
  try {
    await mongoose.connect(DATABASE_URL)
    app.listen(PORT, () => {
      console.log(`Server has been started on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()
