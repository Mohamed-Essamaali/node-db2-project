const express = require('express')
const carsRouter = require('./cars/carsRouter')

const server = express()
const port = process.env.port || 5000

server.use(carsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
    })
})

server.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})