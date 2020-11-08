const sql = require("./db.js");

// constructor
const User = function (user) {
	this.username = user.username;
	this.email = user.email;
	this.mobileNumber = user.mobileNumber;
	this.passwordHash = user.password;
	this.avatarUrl = user.avatarUrl || null;
};

User.getAll = result => {
	sql
		.select()
		.table("users")
		.then(response => {
			result(null, {
				result: response,
				success: true,
				error: null,
			});
		})
		.catch(err => {
			result(err, null);
		});
};

User.getOne = (id, result) => {
	sql("users")
		.where("id", "=", id)
		.select()
		.then(response => {
			if (response.length !== 0)
				result(null, {
					result: response[0],
					success: true,
					error: null,
				});
			else
				result(null, {
					success: false,
					error: "not found",
				});
		})
		.catch(err => {
			result({ message: err.message, success: false, error: null }, null);
		});
};

User.create = (newUser, result) => {
	sql("users")
		.returning("id")
		.insert(newUser)
		.then(id => {
			result(null, {
				result: { ...newUser, id: id[0] },
				success: true,
				error: null,
			});
		})
		.catch(err => {
			result(err, null);
		});
};

User.update = (user, result) => {
	sql("users")
		.where("id", "=", user.id)
		.update(user)
		.then(response => {
			console.log(response);
			result(null, {
				result: response[0],
				success: true,
				error: null,
			});
		})
		.catch(err => {
			result(err, null);
		});
};

User.delete = (id, result) => {
	sql("users")
		.where("id", "=", id)
		.del()
		.then(response => {
			result(null, {
				success: true,
				error: null,
			});
		})
		.catch(err => {
			result(err, null);
		});
};

module.exports = User;
