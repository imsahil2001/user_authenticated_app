import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./signup.css";
import Button from "@mui/material/Button";

function SignUp() {
	const history = useHistory();

	const [user, setUser] = useState({
		name: "",
		email: "",
		phone: "",
		work: "",
		password: "",
		cpassword: "",
	});

	let name, value;
	const handleInputs = (e) => {
		name = e.target.name;
		value = e.target.value;

		setUser({ ...user, [name]: value });
	};

	const PostData = async (e) => {
		e.preventDefault();

		const { name, email, phone, work, password, cpassword } = user;

		const res = await fetch("/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ name, email, phone, work, password, cpassword }),
		});

		const data = await res.json();

		if (res.status === 422 || !data) {
			alert("Invalid registration");
		} else {
			alert("successfully registered");
			history.push("/login");
		}
	};

	return (
		<div className="signup-body">
			<h1>Sign Up</h1>

			<div className="signup-box">
				<form method="POST" className="signup-form">
					<div className="signup-input">
						<label>
							Name
							<br />
						</label>

						<input
							type="text"
							name="name"
							className=""
							value={user.name}
							onChange={handleInputs}
						/>
					</div>

					<div className="signup-input">
						{/* email */}
						<label>Email</label>
						<br />
						<input
							type="email"
							name="email"
							className=""
							value={user.email}
							onChange={handleInputs}
						/>
					</div>

					<div className="signup-input">
						{/* phone */}
						<label>Phone</label>
						<br />
						<input
							type="number"
							name="phone"
							className=""
							value={user.phone}
							onChange={handleInputs}
						/>
					</div>
					<div className="signup-input">
						{/* work */}
						<label>Work</label>
						<br />
						<input
							type="text"
							name="work"
							className=""
							value={user.work}
							onChange={handleInputs}
						/>
					</div>

					<div className="signup-input">
						{/* password */}
						<label>Password</label>
						<br />
						<input
							type="password"
							name="password"
							className=""
							value={user.password}
							onChange={handleInputs}
						/>
					</div>

					<div className="signup-input">
						{/* confirm password */}
						<label>Confirm Password</label>
						<br />
						<input
							type="password"
							name="cpassword"
							className=""
							value={user.cpassword}
							onChange={handleInputs}
						/>
					</div>

					<div className="signup-btn">
						<Button
							onClick={PostData}
							type="submit"
							className="signup-form-btn"
						>
							Sign Up
						</Button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
