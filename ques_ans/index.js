const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const port = 3002

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/quiz_game', (err) => {
	if (err) console.log(err)
	console.log('connect to db successfully')
})

const Question = require('./QuestionSchema')
const Answer = require('./AnswerSchema')

app.get('/exam', async (req, res) => {
	const ques = await Question.find()
	const questions = []
	const lenQ = Object.keys(ques).length
	for (let i = 0; i < lenQ; i++) {
		// console.log(ans[i].ans);
		questions.push({
			ques: ques[i].ques,
			ans: ques[i].ans,
		})
	}

	const ans = await Answer.find()
	const answers = []
	const lenA = Object.keys(ans).length
	for (let i = 0; i < lenA; i++) {
		// console.log(ans[i].ans);
		answers.push(ans[i].ans)
	}

	return res.send({
		questions,
		answers,
	})
})

app.get('/practice', async (req, res) => {
	const ques = await Question.find()
	const questions = []
	// const lenQ = Object.keys(ques).length
	for (let i = 0; i < 5; i++) {
		// console.log(ans[i].ans);
		questions.push({
			ques: ques[i].ques,
			ans: ques[i].ans,
		})
	}

	const ans = await Answer.find()
	const answers = []
	// const lenA = Object.keys(ans).length
	for (let i = 0; i < 5; i++) {
		// console.log(ans[i].ans);
		answers.push(ans[i].ans)
	}

	return res.send({
		questions,
		answers,
	})
})

app.listen(port, () => {
	console.log(`http://localhost:${port}`)
})
