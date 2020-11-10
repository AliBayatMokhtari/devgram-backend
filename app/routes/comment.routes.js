module.exports = app => {
	const comments = require("../controllers/Comment.controller.js");

	app.post("/comments", comments.create);
	app.delete("/comments/:id", comments.delete);
};
