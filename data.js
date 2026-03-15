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

app.post('/users',async(req,res)=>{
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

app.get('/users',async(req, res)=>{
    try {
        const users=await User.find();
        res.json(users);    
    }
    catch(err) {
        res.status(500).json({message:err.message});
    }
});

app.put('/users/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);  
        user.name=req.body.name;
        user.age=req.body.age;
        user.role=req.body.role;
        const updatedUser=await user.save();
        res.json(updatedUser);
    }
    catch(err) {
        res.status(400).json({message:err.message});
    }
});

app.delete('/users/:id',async(req,res)=>{
    try {
        const user=await User.findById(req.params.id);
        await user.remove();
        res.json({message:"User deleted"});
        }
    catch(err) {
        res.status(500).json({message:err.message});
        }
});


app.listen(2000,()=>{
    console.log("Server is running on port 2000");
});


