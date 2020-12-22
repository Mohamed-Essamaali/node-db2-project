const express = require('express')
const { andWhereNotBetween } = require('../data/connect')
const db = require('../data/connect')
const router = express.Router()
router.use(express.json()) // add midleware json to read json formst from req.body

//get all cars
router.get('/cars', async (req,res,next)=>{
    try{
        res.json(await db("cars"))
    }
    catch(err){next(err)}
})

// get one car based on id

router.get('/cars/:id', async (req,res,next)=>{
    try{
        const id = req.params.id
        console.log('id is',{id})
        const car = await db("cars").where({id}).first()
        res.json(car)
    }
    catch(err){next(err)}
})

// add an other car

router.post('/cars', async (req,res,next)=>{
    try{

        let payload = {
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage
        }
        const [id] = await db('cars').insert(req.body) // insert newcar and return the ids
        const newCar = await db('cars').where({id}).first() // return added car based on ids[0]]
        res.status(201).json(newCar)

    }
    catch(err){
        next(err)
    }
})

module.exports = router