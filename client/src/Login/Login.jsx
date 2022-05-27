import React, { useState } from "react";
import "./Login.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";

function Login() {
	const history = useHistory();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();

	const userLogin = async (e) => {
		e.preventDefault();

		const res = await fetch("/signin", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				password,
			}),
		});

		const data = await res.json();

		console.log(data);
		if (res.status === 400 || !data) {
			window.alert("Invalid Credentials");
		} else {
			window.alert("Successfully registered");
			history.push("/");
		}
	};

	return (
		<div className="login-body">
			<div className="login-box">
				<h1> Login </h1>
				<form method="POST" className="login-form">
					<label className="email">
						Email
						<input
							type="email"
							name="email"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</label>
					<br />
					<label className="password">
						Password
						<input
							type="password"
							name="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</label>
					<br />
					<Button className="login-submit-btn" onClick={userLogin}>
						Submit
					</Button>
				</form>
			</div>
		</div>
	);
}

export default Login;
