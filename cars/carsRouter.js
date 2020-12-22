const express = require('express')
const { andWhereNotBetween } = require('../data/connect')
const db = require('../data/connect')
const router = express.Router()
router.use(express.json()) // add midleware json to read json formst from req.body


// check if id exists

const validateId =  ()=>{
    return  async (req,res,next)=>{
       let id = await db('cars').where("id",req.params.id).first()
       console.log(id)
       if(!id){
           return res.status(404).json({message:`No Car exists with id ${req.params.id}`})
       }
       next()
  
    }
}

//get all cars
router.get('/cars', async (req,res,next)=>{
    try{
        res.json(await db("cars"))
    }
    catch(err){next(err)}
})

// get one car based on id

router.get('/cars/:id', validateId(), async (req,res,next)=>{
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
        if(!payload.vin || !payload.make || !payload.model || !payload.mileage){
            return res.status(400).json({message:'missing vin or make or model or mileage'})
        }
        const [id] = await db('cars').insert(payload) // insert newcar and return the ids it works either as payload or just req.body
        const newCar = await db('cars').where({id}).first() // return added car based on ids[0]]
        res.status(201).json(newCar)

    }
    catch(err){
        next(err)
    }
})

//  edit car information

router.put('/cars/:id', validateId(), async (req,res,next)=>{

    try{
        let payload = {
            vin: req.body.vin,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            type: req.body.type,
            status: req.body.status
        }
        if(!payload.vin || !payload.make || !payload.model || !payload.mileage){
            return res.status(400).json({message:'missing vin, make, model, or mileage'})
        }
        await db('cars').where("id",req.params.id).update(payload)
        const updated  = await db('cars').where('id',req.params.id).first() 
         res.send(updated)
        
   

    }
    catch(err){next(err)}
})



// delete a car based on an id
router.delete('/cars/:id',validateId(), async (req,res,next)=>{

    try{
        await db('cars').where("id",req.params.id).del()
        res.send({message:`car with id ${req.params.id} is deleted successfully`})
    }
    catch(err){next(err)}
}) 


module.exports = router