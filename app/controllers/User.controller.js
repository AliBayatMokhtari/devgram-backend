const User = require("../models/user.model.js");

// Get all the users
exports.getAll = (req, res) => {
	User.getAll((err, data) => {
		if (err) {
			res.status(400).send({
				message: err.message || "something went wrong in db",
			});
		} else {
			res.status(200).send(data);
		}
	});
};

exports.getOne = (req, res) => {
	const id = req.params.id;
	if (!id) {
		res.send({ message: "id is required" }).status(400);
	}
	User.getOne(id, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err.message || "something went wrong in db",
			});
		} else {
			if (data.success) res.status(200).send(data);
			else res.status(404).send(data);
		}
	});
};

// Create and Save a new User
exports.create = (req, res) => {
	// Validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty",
		});
	}

	// TODO: Hash user password

	// Create a User
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		password: req.body.password,
		avatarUrl: req.body.avatarUrl,
	});

	// Save User in database
	User.create(user, (err, data) => {
		if (err)
			res.status(500).send({
				message: err.message || "Some error occurred while creating the User.",
			});
		else res.status(201).send(data);
	});
};

exports.update = (req, res) => {
	// validate request
	if (!req.body) {
		res.status(400).send({
			message: "Content can not be empty",
		});
	}

	if (!req.params.id || !req.body.id) {
		res.status(400).send({
			message: "id required in query string and request body.",
		});
	}

	const bodyId = parseInt(req.body.id);
	const queryStringId = parseInt(req.params.id);

	if (bodyId !== queryStringId) {
		res.status(400).send({
			message: "id in query string and request body must be the same",
		});
	}

	// make a user with that id
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		mobileNumber: req.body.mobileNumber,
		password: req.body.password,
		avatarUrl: req.body.avatarUrl,
	});

	user.id = req.body.id;

	// update the user with User function class
	User.update(user, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err.message || "Some error occurred while updating the User.",
			});
		} else {
			res.send(data).status(200);
		}
	});
};

exports.delete = (req, res) => {
	if (!req.params.id) {
		res.status(400).send({
			message: "id is required",
		});
	}

	const id = req.params.id;
	User.delete(id, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err.message || "Some error occurred while updating the User.",
			});
		} else {
			res.send(data).status(200);
		}
	});
};
