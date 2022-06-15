const express = require('express')
const mongoose = require('mongoose')
const todoRoutes = require('./routes/routes')
const cors = require('cors')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

app.use(todoRoutes)

async function start() {
	try {
		await mongoose.connect(
			'mongodb+srv://pasha:KR7cB9Mr3ehRk7jy@cluster0.e2wkx.mongodb.net/?retryWrites=true&w=majority')
		app.listen(PORT, () => {
			console.log(`Server has been started on port ${PORT}`)
		})
	} catch (e) {
		console.log(e)
	}
}

start()
