const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3003

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/quiz_game', (err) => {
	if (err) console.log(err)
	console.log('connect to db successfully')
})

const User = require('./UserSchema')

app.get('/user/:name', async (req, res) => {
	const data = await User.find()
	// console.log(data);
	const name = req.params.name
	const len = Object.keys(data).length
	for (let i = 0; i < len; i++) {
		if (data[i].name == name)
			return res.send({ score: data[i].score, id: data[i].id })
	}

	const user = new User({
		name: name,
		score: 0,
	})
	user.save()
	return res.send({ score: 0 })
})

app.post('/user', async (req, res) => {
	const name = req.body.name
	const score = req.body.score
	const id = req.body.id
	// console.log(id, name, score);

	let tmp = 0
	const users = await User.find()
	const len = Object.keys(users).length
	for (let i = 0; i < len; i++) {
		if (users[i].name == name) {
			tmp = 1
			if (users[i].score < score) {
				const user = await User.findById(id)
				user.score = score
				user.save()
				return res.sendStatus(200)
			}
		}
	}
	if (tmp == 0) {
		const data = new User({
			name: req.body.name,
			score: req.body.score,
		})
		data.save()
	}
	return res.sendStatus(200)
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
