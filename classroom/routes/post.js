const express=require("express");
const router=express.Router();
//index-user
router.get("/",(req,res)=>{
    res.send("Get for post");
});

router.get("/:id",(req,res)=>{
    res.send("get show post");
})

router.post("/",(req,res)=>{
    res.send("Post for show posts");
})

router.delete("/:id",(req,res)=>{
    res.send("Delete for show posts");
})

module.exports=router;