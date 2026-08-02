const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const mongo_url = "mongodb://127.0.0.1:27017/homigo";

async function main(){
    await mongoose.connect(mongo_url);
}

main()
.then(()=>{
    console.log("connected");
}).catch(err => console.log(err));

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({...obj,owner:"6a6f8098fc2b5ab304cc95ed"}));
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();