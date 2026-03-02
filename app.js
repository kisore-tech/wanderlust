const express=require("express");
const mongoose=require("mongoose");
const ejsMate=require("ejs-mate");
const path=require("path");
const app = express();
const port=3000;
const methodOverride=require("method-override");
const ExpressError=require("./utils/ExpressError.js");


const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

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





app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews);


// 404 handler
app.use((req, res, next) => {
     next(new ExpressError(404, "Page Not Found!"));
});

// error middleware
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.status(statusCode).render("listings/error.ejs",{err});
    // res.status(statusCode).send(message);
});

app.listen(port,()=>{
    console.log("server is listening to port 3000");
});


