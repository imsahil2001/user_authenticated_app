const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 8000;

dotenv.config({
	path: "./config.env",
});

require("./db/conn");

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8000;

const User = require("./model/userSchema");

app.use(require("./router/auth"));

// app.get("/", (req, res) => {
// 	res.send(`hi to m!`);
// });

// app.get("/about", (req, res) => {
// 	res.send(`hi to about!`);
// });

// app.get("/contact", (req, res) => {
// 	res.send(`hi to contact!`);
// });

// app.get("/signup", (req, res) => {
// 	res.send(`hi to signup!`);
// });

// app.get("/signin", (req, res) => {
// 	res.send(`hi to signin!`);
// });

if (process.env.NODE_ENV == "production") {
	app.use(express.static("client/build"));
	const path = require("path");
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`listening to the port ${PORT}`);
});
