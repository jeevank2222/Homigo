const express= require("express");
const router= express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../util/wrapAsync.js");
const {isLoggedIn , isOwner , validateListing } = require("../middleware.js")
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage })


router.route("/")
.get( wrapAsync(listingController.index))
.post(isLoggedIn  , upload.single('listing[image][filename]'),validateListing,wrapAsync(listingController.createListing));


//New route
router.get("/new",isLoggedIn ,listingController.renderNewForm)

router.get("/homes", wrapAsync(listingController.homeListings)
);

router.get("/experiences",wrapAsync(listingController.experienceListings)
);

router.get("/services",wrapAsync(listingController.serviceListings)
);

//search

router.get("/search", async (req, res) => {

    let { location, title, price } = req.query;

    let query = {};


    // Search by location
    if(location){

    query.$or = [
        {
            location: {
                $regex: location,
                $options: "i"
            }
        },
        {
            country: {
                $regex: location,
                $options: "i"
            }
        }
    ];

}


    // Search inside title words
    if(title){

        query.title = {
            $regex: title,
            $options: "i"
        };

    }


    // Price less than or equal to
    if(price){

        query.price = {
            $lte: Number(price)
        };

    }


    let allListings = await Listing.find(query);


    res.render("listings/index.ejs", {
        allListings ,
        showSearch:true
    });

});


router.route("/:id")
.get( wrapAsync(listingController.showListing))
.put( isLoggedIn ,isOwner , upload.single('listing[image][filename]'),validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedIn ,isOwner , wrapAsync(listingController.destroyListing));


//Edit route
router.get("/:id/edit" , isLoggedIn , isOwner ,wrapAsync(listingController.renderEditForm));

module.exports = router;