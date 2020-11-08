module.exports = app => {
	const users = require("../controllers/User.controller.js");

	app.get("/users", users.getAll);
	app.get("/users/:id", users.getOne);
	app.post("/users", users.create);
	app.put("/users/:id", users.update);
	app.delete("/users/:id", users.delete);
};
