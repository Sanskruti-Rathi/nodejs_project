var express=require('express');
var app=express();
app.use(express.json());
let user=[
    {  id:1,
        name:"John",
        age:30
     },
     {
        id:2,
        name:"Jane",
        age:25,
     },
     {
        id:3,
        name:"Bob",
        age:40,
     }, 
     {
        id:4,
        name:"Alice",
        age:35,
     },
];

app.get('/users',function(req,res){
    res.send(user);
});
app.post('/user',function(req,res){
    const {name,age}=req.body;

    user.push({
        id:user.length+1,
        name:name,
        age:age,
    })
    res.send("User added successfully");
});
app.put('/user/:id',function(req,res){
    const id=req.params.id;
    const {name,age}=req.body;
    const userIndex=user.findIndex(u=>u.id==id);
    if (userIndex=== -1){
        return res.status(404).json({error:"User not found"});
    }
    user[userIndex]={
        id:id,
        name:name,
        age:age,
    };
    res.send("User updated successfully");

});
app.delete('/user/:id',function(req,res){
    const id=req.params.id;
    const userIndex=user.findIndex(u=>u.id==id);
    if (userIndex=== -1){
        return res.status(404).json({error:"User not found"});
    }
    user.splice(userIndex,1);
    res.send("User deleted successfully");
});

app.listen(1000,function(){
    console.log("Server is running on port http://localhost:1000");
})