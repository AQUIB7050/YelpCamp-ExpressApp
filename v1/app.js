var express = require("express");
var app = express();
var bodyParser = require("body-parser");



app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine","ejs");

var campgrounds = [
      {name: "Salmon Creek", image: "https://pixabay.com/get/57e1d14a4e52ae14f1dc84609620367d1c3ed9e04e507441732772d69345cc_340.jpg"},
      {name: "Granite Hill", image: "https://pixabay.com/get/50e9d4474856b10ff3d8992ccf2934771438dbf85254794f7d2679d09f44_340.jpg"},
      {name: "Mountain goat's Rest", image: "https://pixabay.com/get/57e8d1454b56ae14f1dc84609620367d1c3ed9e04e507441732772d69345cc_340.jpg"}
    ]

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
      
      
      res.render("campgrounds",{campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
	//Get Data From form and add to campgrounds array
	//redirect back to campgrounds page
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image: image}
	campgrounds.push(newCampground);
	//redirect back to the campground page
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new");
});



app.listen(3005, function(){
	console.log("YelpCamp Server Has Started");
});