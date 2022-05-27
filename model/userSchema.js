const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const date = new Date();
const months = [
	"Jan",
	"Feb",
	"Mar",
	"April",
	"May",
	"June",
	"July",
	"Aug",
	"Sept",
	"Oct",
	"Nov",
	"Dec",
];

const dateAC = {
	date: date.getDate(),
	month: months[date.getMonth()],
	year: date.getFullYear(),
};

const dateString = `${date.getDate()} ${
	months[date.getMonth()]
} ${date.getFullYear()}`;

// Schema of User (Structure of document)
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: Number,
		required: true,
	},
	work: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	cpassword: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	messages: [
		{
			name: {
				type: String,
				required: true,
			},
			email: {
				type: String,
				required: true,
			},
			message: {
				type: String,
				required: true,
			},
		},
	],
	blogs: [
		{
			title: {
				type: String,
				required: true,
			},
			description: {
				type: String,
				required: true,
			},

			date: {
				type: String,
				default: dateString,
			},
		},
	],
	tokens: [
		{
			token: {
				type: String,
				required: true,
			},
		},
	],
});

//pre fncs
userSchema.pre("save", async function (next) {
	if (this.isModified("password")) {
		this.password = await bcrypt.hash(this.password, 12);
		this.cpassword = await bcrypt.hash(this.cpassword, 12);
	}
	next();
});

// jwt token
userSchema.methods.generateAuthToken = async function () {
	try {
		const token = jwt.sign(
			{
				_id: this._id.toString(),
			},
			process.env.SECRET_KEY
		);
		this.tokens = this.tokens.concat({
			token: token,
		});
		await this.save();
		return token;
	} catch (e) {
		console.log(e);
	}
};

// adding message to DB
userSchema.methods.addMessage = async function (name, email, message) {
	try {
		this.messages = this.messages.concat({ name, email, message });
		await this.save();
		return this.messages;
	} catch (error) {
		console.log(error);
	}
};

// adding blogs in the database

userSchema.methods.addBlog = async function (title, description) {
	try {
		this.blogs = this.blogs.concat({
			title,
			description,
		});
		await this.save();
		return this.blogs;
	} catch (e) {
		console.log("error in adding blog UserSchema" + e);
	}
};

// Model of userSchema
const User = mongoose.model("USER", userSchema);

module.exports = User;
