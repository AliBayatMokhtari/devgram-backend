module.exports = app => {
	const posts = require("../controllers/Post.controller.js");

	app.get("/posts", posts.getAll);
	app.get("/posts/:id", posts.getOne);
	app.post("/posts", posts.create);
	app.put("/posts/:id", posts.update);
	app.delete("/posts/:id", posts.delete);
};
