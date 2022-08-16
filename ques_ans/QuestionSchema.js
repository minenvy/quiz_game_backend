const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
	ques: {
		type: String,
	},
	ans: [
		{
			type: String,
		},
	],
})

const Question = new mongoose.model('questions', questionSchema)

module.exports = Question
