const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");

const User = require("../model/userSchema");

// Async Await
// ------------------------------
router.post("/register", async (req, res) => {
	try {
		const { name, email, phone, work, password, cpassword } = req.body;

		if (!name || !email || !phone || !work || !password || !cpassword) {
			return res.status(422).json({
				errors: "plz fill the fields",
			});
		}

		const userExists = await User.findOne({
			email: email,
		});

		if (userExists) {
			return res.status(401).send({
				message: "already regisered",
			});
		} else if (password !== cpassword) {
			return res.status(401).send({
				message: "cpassword didnt match",
			});
		} else {
			const user = new User({
				name,
				email,
				phone,
				work,
				password,
				cpassword,
			});

			await user.save();

			res.status(201).send({
				message: "user registered",
			});
		}
	} catch (err) {
		console.log(err);
	}
});

router.post("/signin", async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).send({
				message: "Fill the details",
			});
		}

		const userLogin = await User.findOne({
			email: email,
		});

		if (userLogin) {
			const isMatch = await bcrypt.compare(password, userLogin.password);

			const token = await userLogin.generateAuthToken();
			console.log(token);

			res.cookie("jwt_token", token, {
				expires: new Date(Date.now() + 259000000),
				httpOnly: true,
			});

			if (!isMatch) {
				return res.status(404).send({
					message: "Invalid password",
				});
			} else {
				return res.status(200).send({
					message: "Signed in successfully",
				});
			}
		} else {
			return res.status(404).send({
				message: "Invalid Credentials",
			});
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

// about us page
router.get("/about", authenticate, (req, res) => {
	res.send(req.rootUser);
});

// get user data for message and home page
router.get("/getdata", authenticate, (req, res) => {
	res.send(req.rootUser);
});

// getting message from message page and saving to particular document
router.post("/contact", authenticate, async (req, res) => {
	try {
		const { name, email, message } = req.body;

		if (!name || !email || !message) {
			console.log(`plz fill your details`);
			res.json({ error: "Plz fill your details" });
		} else {
			const userContact = await User.findOne({ _id: req.UserID });

			if (userContact) {
				const addingMessage = await userContact.addMessage(
					name,
					email,
					message
				);

				await userContact.save();

				res
					.status(201)
					.json({ message: "everything is done in saving the message" });
			}
		}
	} catch (e) {
		console.log(e);
	}
});

router.post("/blogpost", authenticate, async (req, res) => {
	try {
		// console.log(req.body);
		const { title, description } = req.body;
		if (!title || !description) {
			return res.json({ error: "Please check the field" });
		}
		const userBlog = await User.findOne({ _id: req.UserID });
		// console.log(userBlog);

		if (userBlog) {
			const userBlogPost = await userBlog.addBlog(title, description);
			userBlog.save();
			res.status(200).json({ message: "blog saved successfully" });
		}
	} catch (e) {
		console.log("error in auth in blog post" + e);
	}
});

//  get user data for contact us and home page
router.get("/getblog", authenticate, (req, res) => {
	console.log(`hello my blogs`);
	res.send(req.rootUser);
});

// logout fucntionality
router.get("/logout", (req, res) => {
	console.log(`logout page`);
	res.clearCookie("jwt_token", { path: "/" });
	res.status(200).send({ message: "Successfully logged out" });
});

module.exports = router;
