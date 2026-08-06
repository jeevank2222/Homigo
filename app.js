
require('dotenv').config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./util/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const port = 8080;

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

// const mongo_url = "mongodb://127.0.0.1:27017/homigo";
const dbUrl = process.env.ATLAS_DB_URL;

async function main(){
    await mongoose.connect(dbUrl);
}

main()
.then(()=>{
    console.log("connected");
}).catch(err => console.log(err));

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24*3600,
});

store.on("error",()=>{
    console.log("error in mongo session store");
})

const sessionOptions = {
    store: store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
}

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    res.locals.currentPath = req.path;
    next();
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews" , reviewRouter)
app.use("/" , userRouter)


app.get("/",(req,res)=>{
    res.send("im root");
})

//Error handling 

app.all('/{*splat}',( req,res,next) =>{
    next(new ExpressError(404,"Page Not Found"));
})

app.use((err,req,res,next) => {
    let {status=500, message="something went wrong"} = err;
    res.status(status).render("error.ejs",{message});
    // res.status(status).send(message);
});

app.listen(port,()=>{
    console.log("listening");
})