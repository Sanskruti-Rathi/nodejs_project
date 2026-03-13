const user = require('./models/user');
const express = require('express');
const mongoose = require('mongoose');

const app = express();


mongoose.connect('mongodb+srv://sanskruti:87654321@test.rkx22j0.mongodb.net/?appName=test')
.then(()=>console.log("Database Connected"))
.catch(err=>console.log(err));

app.use(express.json());

const userschema=new mongoose.Schema({
    name:{type:String,required:true},
    age:Number,
    role:{type:String,default:"user"},
    date:{type:Date,default:Date.now},
});

const  User=mongoose.model('User',userschema);

app.post('/user',async(req,res)=>{
    const user = new User({
        name:req.body.name,
        age:req.body.age,
        role:req.body.role,
     });

     try {
        const newUser =await user.save();
        res.status(201).json(newUser);
     }
     catch(err) {
        res.status(400).json({message:err.message});
     }
});

app.listen(2000,()=>{
    console.log("Server is running on port 2000");
});


