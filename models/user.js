class user {
    constructor(id,name,age,role="user"){
        this.id=id;
        this.name=name;
        this.age=age;
        this.role=role;
        this.date=new Date();
    
}
}
module.exports=user;