var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
     {
     	name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1520824071669-892f70d8a23d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah"
     },

      {
     	name: "desert Meso",
        image: "https://images.unsplash.com/photo-1542067519-6cd1e217df2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah"
     },

      {
     	name: "Canyon floor",
        image: "https://images.unsplash.com/photo-1503377984674-b81eeeedbb3b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
        description: "blah blah blah"
     }
]


function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
	  if(err){
		  console.log(err);
	  } else {
	 	  console.log("removed campgrounds!");
	 	  //add a few campgrounds
	 	  data.forEach(function(seed){
   	        Campground.create(seed, function(err, campground){
   	     	if(err){
   	     		console.log(err);
   	     	} else {
   	     		console.log("added a campground");
   	     		//create comment
   	     		Comment.create(
   	     		     {
   	     			  text: "This place is great but i wish there internet",
   	     			  author: "Homer"
   	     	                 }, function(err, comment){
   	     	                 	     if (err){
   	     	                 		      console.log(err);
   	     	                 	     } else {
                                          campground.comments.push(comment);
                                          campground.sace();
                                          console.log("created new comment");
                                     }
   	     	                 });
   	     	}
   	               });
             });
	  }
   });
   
   
   

   //add a few comments
}

module.exports = seedDB;