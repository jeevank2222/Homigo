const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type:String,
    },
    description : String,
    image: {
    filename: {
        type: String,
        default: "listingimage",
    },
    url: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg",
        set: (v)=> v==="" ? "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg" : v,
    },
    },
    price: Number,
    location: String,
    country: String,
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;