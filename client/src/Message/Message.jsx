import React, { useState, useEffect } from "react";
import "./message.css";
import Button from "@mui/material/Button";

function Message() {
	const [displayData, setDisplayData] = useState({
		name: "",
		email: "",
		message: "",
	});

	const MessagePage = async () => {
		try {
			const res = await fetch("/getdata", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			setDisplayData({
				...displayData,
				name: data.name,
				email: data.email,
				message: data.message,
			});

			if (!data.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		MessagePage();
	}, []);

	// data storing in states
	const handleInputs = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setDisplayData({ ...displayData, [name]: value });
	};

	//submitting data and updating to DB
	const formSubmit = async (e) => {
		e.preventDefault();
		const { name, email, message } = displayData;

		const res = await fetch("/contact", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, message }),
		});

		const data = await res.json();

		if (!data) {
			window.alert("Message not Send");
		} else {
			window.alert("Message Sent Successfully");
			setDisplayData({ ...displayData, message: "" });
		}
	};

	return (
		<div className="message-body">
			<h1>Message</h1>

			<div className="message-box">
				<form method="POST" className="message-form">
					<div className="message-input">
						<label>
							Name
							<br />
						</label>

						<input
							type="text"
							name="name"
							className=""
							value={displayData.name}
							onChange={handleInputs}
						/>
					</div>

					<div className="message-input">
						{/* email */}
						<label>Email</label>
						<br />
						<input
							type="email"
							name="email"
							className=""
							value={displayData.email}
							onChange={handleInputs}
						/>
					</div>

					<div className="message-input msg-box">
						{/* message */}
						<label>Message</label>
						<br />
						<textarea
							type="text"
							className
							name="message"
							placeholder="Write your message here"
							value={displayData.message}
							onChange={handleInputs}
						/>
					</div>

					<div className="message-btn">
						<Button
							onClick={formSubmit}
							type="submit"
							className="message-form-btn"
						>
							Submit
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Message;
