const Listing = require("../models/listing");

module.exports.index = async(req,res)=>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{allListings});
};

module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
}

module.exports.showListing = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    if(!listing){
    req.flash("error","Listing does not exist");
    return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});
};

module.exports.createListing = async(req,res,next)=>{
    let url = req.file.path;
    let filename = req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {filename,url}
    await newListing.save();
    req.flash("success","New listing created successfully");
    res.redirect("/listings");
};

module.exports.renderEditForm = async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
    req.flash("error","Listing does not exist");
    return res.redirect("/listings");
    }
    let originalUrl = listing.image.url;
    originalUrl = originalUrl.replace("/upload","/upload/w_250");
    res.render("listings/edit.ejs",{listing,originalUrl})
};

module.exports.updateListing = async (req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {filename,url}
    await listing.save();
    }
    req.flash("success","Listing details has been changed successfully");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    let deleted = await Listing.findByIdAndDelete(id);
    console.log(deleted);
    req.flash("success","listing deleted successfully");
    res.redirect("/listings");
};

module.exports.experienceListings = async(req,res)=>{
    const experiences = await Listing.find({
        category:"experience"
    });

    res.render("listings/index.ejs", {
        allListings: experiences
    });
};

module.exports.homeListings = async(req,res)=>{

    const homes = await Listing.find({
        category:"home"
    });

    res.render("listings/index.ejs", {
        allListings: homes
    });

};

module.exports.serviceListings = async(req,res)=>{

    const services = await Listing.find({
        category:"service"
    });

    res.render("listings/index.ejs", {
        allListings: services
    });

};