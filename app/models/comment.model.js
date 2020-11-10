const sql = require("./db.js");

// Constructor
const Comment = function (comment) {
	this.txt = comment.txt;
	this.userId = comment.userId;
	this.commentId = comment.commentId;
	this.postId = comment.postId;
};

Comment.create = (comment, result) => {
	sql("comments")
		.returning("id")
		.insert(comment)
		.then(dbResponse => {
			result(null, {
				result: { ...comment, id: dbResponse[0] },
				success: true,
				error: null,
			});
		})
		.catch(err => {
			result(
				{
					...err,
					success: false,
					error: true,
				},
				null
			);
		});
};

Comment.delete = (id, result) => {
	sql("comments")
		.where("id", "=", id)
		.del()
		.then(dbResponse => {
			if (dbResponse === 0)
				result(
					{
						message: "comment not found",
						success: false,
						error: true,
						statusCode: 404,
					},
					null
				);
			else
				result(null, {
					success: true,
					error: null,
				});
		})
		.catch(err => {
			result(
				{
					...err,
					success: false,
					error: true,
				},
				null
			);
		});
};

module.exports = Comment;
