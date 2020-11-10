const Post = require("../models/post.model.js");

exports.getAll = (req, res) => {
	Post.getAll((err, data) => {
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
		res.status(400).send({
			message: "id is required",
		});
		return;
	}

	Post.getOne(id, (err, data) => {
		if (err) res.status(400).send({ ...err });
		else res.status(201).send(data);
	});
};

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "request body can not be empty",
			success: false,
			error: true,
		});
		return;
	}

	const post = new Post({
		caption: req.body.caption,
		userId: req.body.userId,
	});

	Post.create(post, (err, data) => {
		if (err)
			res.status(400).send({
				message: err.message || "something went wrong",
				...err,
			});
		else res.status(201).send(data);
	});
};

exports.update = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "request body can not be empty",
			success: false,
			error: true,
		});
		return;
	}

	if (!req.body.id || !req.params.id) {
		res.status(400).send({
			message: "id is necessary in parameter and request body",
			success: false,
			error: true,
		});
		return;
	}

	const reqParamId = parseInt(req.params.id);
	const reqBodyId = parseInt(req.body.id);

	if (reqBodyId !== reqParamId) {
		res.status(400).send({
			message: "ids must be the same",
			success: false,
			error: true,
		});
		return;
	}

	const post = new Post({
		caption: req.body.caption,
		userId: req.body.userId,
	});

	post.id = req.body.id;

	Post.update(post, (err, data) => {
		if (err)
			res.status(400).send({
				message: err.message || "something went wrong",
				...err,
			});
		else res.status(200).send(data);
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;
	if (!id) res.status(400).send({ message: "id is required" });
	Post.delete(id, (err, data) => {
		if (err) res.status(400).send(err);
		else res.status(200).send(data);
	});
};
