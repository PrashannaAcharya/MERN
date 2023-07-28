const express = require('express')

require('dotenv').config()
const app = express()
const connection = require('./db/connection')
connection()
app.use(express.json())
const Products=require('./models/users')
const Users = require('./models/users')

// mongoose.connect('mongodb://localhost:27017/muliVendorDb');
 

 
app.post('/register', (req, res) => {
 Users.create(req.body)
 res.json({
 msg: "you are sucesfully register"
 })
})
 
app.get('/products', async(req, res) => {
 const data = await Products.find()
})
 
app.put('/products/:id', async(req, res) => {
 await Products.findByIdAndUpdate(req.params.id, req.body)
 })
 
 app.delete('/products/:id', async(req, res) => {
 await Products.findByIdAndDelete(req.params.id)
 })
 
 app.get('/products', async(req, res) => {
 const data = await Products.find()
 })
 app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
  })
  
 