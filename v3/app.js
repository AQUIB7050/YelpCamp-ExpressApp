var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Campground = require("./models/campground");
    seedDB = require("./seeds");


seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v3");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");



// Campground.create(
//    {
//       name: "Salmon Creek",
//       image:"https://images.unsplash.com/photo-1542338106-1b4bfe84d5df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
// }, function(err, campground){
// 	if(err){
// 		console.log(err);
// 	} else {
// 		console.log("NEWLY CREATED CAMPGROUND");
// 		console.log(campground);
// 	}
// });




app.get("/", function(req, res){
	res.render("landing");
});


//INDEX - shoow all campgrounds
app.get("/campgrounds", function(req, res){
      //Get All Campgrounds from DB
      Campground.find({}, function(err, allCampgrounds){
      	if(err){
      		   console.log(err);
      	     } else {
      		 res.render("index",{campgrounds: allCampgrounds});
      	   }
      });
   });


//CREATE - add new campgrounds to database
app.post("/campgrounds", function(req, res){
	//Get Data From form and add to campgrounds array
	//redirect back to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc}
	//Create A New Campground And Save To Database(DB)
	Campground.create(newCampground, function(err, newlyCreated){
       if(err){
          	console.log(err);
         } else  {
         	//redirect back to the campground page
              res.redirect("/campgrounds");
         }
	});
	
	
});

//NEW - show form to create new campgrounds
app.get("/campgrounds/new", function(req, res){
	res.render("new");
});


//SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
	//find the campground with provided ID
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			  //render show tempelate with that campground
			  res.render("show", {campground: foundCampground});
		}
	});
	
	
});


app.listen(3005, function(){
	console.log("YelpCamp Server Has Started");
});