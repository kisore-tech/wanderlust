const express=require("express");
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const ejsMate=require("ejs-mate");
const path=require("path");
const app = express();
const port=3000;
const methodOverride=require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"view"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

main().then(res=>console.log("connected to database")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

app.get("/",(req,res)=>{
    res.send("hi I am root");
});

//index route
app.get("/listings",async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})


//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});


//show route
app.get("/listings/:id",async (req, res)=>{
    let {id}=req.params;
    console.log(id);
    const listing=await Listing.findById(id);
 
    res.render("listings/show.ejs",{listing});
})

//create Route
app.post("/listings",async (req,res)=>{
    console.log(req.body);
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit",async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id);
  res.render("listings/edit.ejs",{listing});
});

//update Route
app.put("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect("/listings");
})

//Delete Route
app.delete("/listings/:id",async(req,res)=>{
    let {id}=req.params;
    let deletedlisting= await Listing.findByIdAndDelete(id);
    console.log(deletedlisting);
    res.redirect("/listings");
})

app.listen(port,()=>{
    console.log("server is listening to port 3000");
});


