const mongoose = require('mongoose')

const answerSchema = new mongoose.Schema({
	ans: {
		type: String,
	},
})

const Answer = mongoose.model('answers', answerSchema)

module.exports = Answer
