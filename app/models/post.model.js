const sql = require("./db.js");

// Constructor
const Post = function (post) {
	this.caption = post.caption;
	this.userId = post.userId;
};

Post.getAll = result => {
	sql("posts")
		.select()
		.then(response => {
			result(null, {
				result: response,
				success: true,
				error: null,
			});
		})
		.catch(err => {
			result({ message: err.message, success: false }, null);
		});
};

Post.getOne = (id, result) => {
	sql("posts")
		.where("id", "=", id)
		.select()
		.then(record => {
			if (record.length === 0)
				result(null, { success: false, error: "not found" });
			else
				result(null, {
					result: record[0],
					success: true,
					error: null,
				});
		})
		.catch(err => {
			result(err, null);
		});
};

Post.create = (post, result) => {
	sql("posts")
		.returning("id")
		.insert(post)
		.then(record => {
			result(null, {
				result: { ...post, id: record[0] },
				succes: true,
				error: false,
			});
		})
		.catch(err => {
			result({ ...err, success: false, error: true }, null);
		});
};

Post.update = (post, result) => {
	sql("posts")
		.where("id", "=", post.id)
		.update(post)
		.then(() => {
			result(null, {
				result: post,
				success: true,
				error: false,
			});
		})
		.catch(err => {
			result({
				...err,
				success: false,
				error: true,
			});
		});
};

Post.delete = (id, result) => {
	sql("posts")
		.where("id", "=", id)
		.del()
		.then(() => {
			result(null, {
				success: true,
				error: false,
			});
		})
		.catch(err => {
			result({ ...err, success: false, error: true }, null);
		});
};

module.exports = Post;
