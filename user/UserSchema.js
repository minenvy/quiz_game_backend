const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
	name: String,
	score: Number,
})

const User = new mongoose.model('users', userSchema)

module.exports = User
