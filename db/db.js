let mongoose=require('mongoose')

mongoose.connect("mongodb://localhost:27017/practice")
.then(()=>console.log("connected to db"))
.catch(()=>console.log("connection error"))

let Schema1=new mongoose.Schema({
    name:{type:String},
    age:{type:Number},
    password:{type:String}
})

let Model1=mongoose.model("pt",Schema1)

module.exports={Model1}