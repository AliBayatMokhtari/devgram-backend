const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.send({ message: "Welcome to my application" }).status(200);
});

require("./app/routes/user.routes.js")(app);

//set port and listen for
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
});
