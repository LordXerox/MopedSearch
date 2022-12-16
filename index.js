const express = require("express");
const app = express();

app.use(express.static(__dirname + '/client'))

//get mongoose & body-parser running
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const mongoose = require("mongoose");

const mongooseUri = "mongodb+srv://LordXerox:uUfvvJ77ZwHw4mKi@cluster0.ofvwa1e.mongodb.net/craigslistDB"
mongoose.connect(mongooseUri, {useNewUrlParser: true}, {useUnifiedTopology: true})


//set up Craigslist connection
var
  craigslist = require('node-craigslist'),
  client = new craigslist.Client({
    city : 'chicago'
  });

app.post("/search", function(req, res){
	console.log(req.body.searchResponse)	
	client
  		.search(String(req.body.searchResponse))
  		.then((listings) => {
    	// play with listings here...
   		 listings.forEach((listing) => 
		 
		 res.send(console.log(listing)) );
 		 })
  		.catch((err) => {
    	console.error(err);
  	});
})



//local connection test
const port = process.env.PORT || 3000
app.get('/test', function(request, response) {
	response.type('text/plain')
	response.send('Node.js and Express running on port='+port)
})

app.listen(port, function() {
	console.log("Server is running at http://localhost:3000/")
})
