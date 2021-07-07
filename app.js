const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.send({
        "statusCode":res.statusCode,
        "message":"success"
    })
})
app.post('/create',(req,res)=>{
    console.log(`${JSON.stringify(req.body)}`)
    res.send({
    "statuc" : res.statusCode,
    "message":"success",
    "request body": req.body})
})

let server = app.listen(3000)

module.exports = server