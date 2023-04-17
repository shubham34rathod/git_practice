let express=require('express')
let {Model1}=require("./db/db.js")
let bcrypt=require('bcrypt')
let jwt=require('jsonwebtoken')
let path=require('path')

let app=express()

app.set("views","views")
app.set("view engine","ejs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,"public","css")))

app.get('/',(req,res)=>{
    // res.sendFile(path.join(__dirname,"views","home.html"))
    res.render("home.ejs",{name:"Shubham"})
})

app.get("/form",async (req,res)=>{
    res.render("form")
    let data=await Model1.find().select('-name')
    // console.log(data);
})

app.post('/form',async (req,res)=>{
    // console.log(req.body);
    let pass=await bcrypt.hash(req.body.password,10)
    let doc=await new Model1({
        name:req.body.name,
        age:req.body.age,
        password:pass
    })
    await doc.save()
    let userId={
        name:req.body.name,
        age:req.body.age
    }
    let token=jwt.sign({userId},"shubhamsureshrathod123",{expiresIn:"50000s"})
    console.log(token);
    res.redirect("/form")
})

app.get("*",(req,res)=>{
    res.send("code 404!!! page not found")
})

app.listen(1000,()=>console.log("port is runnin gon 1000"))