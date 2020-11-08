const sql = require("./db.js");

// Constructor
const Post = function (post) {
	this.text = post.text;
	this.userId = post.userId;
};
