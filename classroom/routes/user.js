const express=require("express");
const router=express.Router();
//index-user
router.get("/",(req,res)=>{
    res.send("Get for Users");
});

router.get("/:id",(req,res)=>{
    res.send("get show users");
})

router.post("/",(req,res)=>{
    res.send("Post for show users");
})

router.delete("/:id",(req,res)=>{
    res.send("Delete for show users");
})

module.exports=router;