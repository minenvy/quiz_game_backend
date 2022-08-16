const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const proxy = require('express-http-proxy')
const rateLimit = require('express-rate-limit')
const apicache = require('apicache')
const cluster = require('cluster')
const os = require('os')
const port = 3001

app.use(morgan('combined'))
app.use(cors())
app.use(express.json())

//Rate Limiting
const limiter = rateLimit({
	windowMS: 10 * 60 * 1000, // 10 minutes
	max: 10,
})
app.use(limiter)

//Cache middleware
let cache = apicache.middleware

//Proxy
app.get('/exam', cache('1 minute'), proxy('http://localhost:3002'))
app.get('/practice', cache('1 minute'), proxy('http://localhost:3002'))
app.get('/user/:name', cache('1 minute'), proxy('http://localhost:3003'))
app.post('/user', proxy('http://localhost:3003'))

//Scale app
const numCpu = os.cpus().length
if (cluster.isMaster) {
	for (let i = 0; i < numCpu / 2; i++) {
		cluster.fork()
	}
} else {
	app.listen(port, () => {
		console.log(`http://localhost:${port} at server ${process.pid}`)
	})
}
