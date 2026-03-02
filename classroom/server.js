const express=require("express");
const app=express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.get("/getcookies",(req,res)=>{
    res.cookie("greet","namasta");
    res.cookie("greet","hello");
    res.cookie("madeIn","India");
    res.send("sent you some cookies!");
});

app.get("/greet",(req,res)=>{
    let {name="anonyms"}=req.cookies;
    res.send(`Hi , ${name}`);
})
app.get("/",(req,res)=>{
   console.dir(req.cookies);
   res.send("Hi , i am cookie res!");
});

app.get("/",(req,res)=>{
    res.send("Hi , iam root");
});


app.use("/users",users);
app.use("/posts",posts);



app.listen(3000,()=>{
    console.log("server is listening to 3000");
})
  