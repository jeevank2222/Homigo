const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");

const port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

const mongo_url = "mongodb://127.0.0.1:27017/homigo";

async function main(){
    await mongoose.connect(mongo_url);
}

main()
.then(()=>{
    console.log("connected");
}).catch(err => console.log(err));

// app.get("/testmodule",async(req,res)=>{
//     let sample = new Listing({
//         title: "Villa",
//         description:"Near the beach",
//         price: 4500,
//         location: "Baga beach , Goa",
//         country: "India"
//     });

//     await sample.save()
//     res.send("successfl testing");
    
// });

//Index Route
app.get("/listings",async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
})

//New route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//Create Route
app.post("/listings",async(req,res)=>{
    const newListing = new Listing(req.body.Listing);
    await newListing.save();
    res.redirect("/listings");
})

//Edit route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing})
})

//update route
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.Listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    res.redirect("/listings");
})

app.get("/",(req,res)=>{
    res.send("im root");
})

app.listen(port,()=>{
    console.log("listening");
})