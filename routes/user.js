const express=require("express");
const wrapAsync=require("../utils/wrapAsync.js");
const User=require("../models/user.js");
const router = express.Router();
const passport=require("passport");

router.get("/signup",(req,res)=>{
    res.render("users/signup.ejs");
});

router.post("/signup",wrapAsync(async (req,res)=>{
    let {username,email,password}=req.body;
    const newUser= new User({email,username});
    const registerUser=await User.register(newUser,password);
     console.log(registerUser);
     req.flash("success","welcome to wanderlust");
     res.redirect("/listings");
}));

router.get("/login",(req,res)=>{
   res.render("users/login.ejs");
});

router.post("/login",
    passport.authenticate("local",
    {failureRedirect:'/login',
    failureFlash:true}),
    wrapAsync(async (req,res)=>{
     req.flash("success","welcome to wanderlust");
     res.redirect("/listings");
}));

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return  next(err);
        }
        req.flash("success","you are logged out!");
        res.redirect("/listings");
    })
});

module.exports=router;
