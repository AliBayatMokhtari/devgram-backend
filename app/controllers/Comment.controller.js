const Comment = require("../models/comment.model.js");

exports.create = (req, res) => {
	if (!req.body) {
		res.status(400).send({
			message: "request body can not be empty",
			success: false,
			error: true,
		});
		return;
	}

	const comment = new Comment({
		txt: req.body.txt,
		userId: req.body.userId,
		commentId: req.body.commentId,
		postId: req.body.postId,
	});

	Comment.create(comment, (err, data) => {
		if (err) {
			res.status(400).send({
				message: err.message || "something went wrong",
				success: false,
				error: true,
			});
		} else {
			res.status(201).send(data);
		}
	});
};

exports.delete = (req, res) => {
	const id = req.params.id;

	if (!id) {
		res.status(400).send({
			message: "id is required",
			success: false,
			error: true,
		});
		return;
	}

	Comment.delete(id, (err, data) => {
		if (err) {
			res.status(err.statusCode || 400).send({
				message: err.message || "something went wrong",
				...err,
			});
		} else {
			res.status(200).send(data);
		}
	});
};
