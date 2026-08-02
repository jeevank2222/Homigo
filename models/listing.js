const mongoose = require("mongoose");
const Review = require("./review.js");
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
    reviews:[{
        type: Schema.Types.ObjectId,
        ref: "Review"
    }],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    }

});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;