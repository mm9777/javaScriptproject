const express = require("express")
const mongoose = require("mongoose")
const mongodb = require("mongodb")

const cors = require("cors")
const app = express();
app.use(express.json())
app.use(cors())
const PORT = 8080;
const model = mongoose.model('employee', new mongoose.Schema({name:String, age:String, qualification:String}))
     async function dbInitialization(){
        try{
            const uri = "mongodb+srv://manish:manish2109@cluster0.gyzmplh.mongodb.net/?retryWrites=true&w=majority";
            const db = await mongoose.connect(uri);
            db && console.log("database is connect")
        }
        catch(err){
            console.log(err)
        }

        }
        dbInitialization()
        app.get('employee',async(req, res) =>{
            model.find({},err, result =>{
                res.status(200).send({data:result})
            })
        })
        app.post('employee', async(req, res)=>{
            const new_result = req.body;
            new  model(new_result).save((err,result)=>{
                res.status(200).send(result)

            })
        })
        app.delete('employee',async(req, res)=>{
            const{id}=req.query
            model.findByIdAndDelete({_id:id},(err, result)=>{
            model.find({},(err,result)=>{

        
            res.status(200).send({data:result})
        })
        })})

        
        app.listen(PORT, ()=>{
            console.log("server is running")
        })
