import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import "./About.css";
import { useHistory } from "react-router-dom";

function About() {
	const history = useHistory();
	const [userData, setUserData] = useState({});

	const AboutPage = async () => {
		try {
			const res = await fetch("/about", {
				method: "GET",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				credentials: "include",
			});

			const data = await res.json();
			console.log(data);
			setUserData(data);

			if (!data.status === 200) {
				const error = new Error(res.error);
				throw error;
			}
		} catch (err) {
			console.log(err);
			history.push("/login");
		}
	};

	useEffect(() => {
		AboutPage();
	}, []);

	return (
		<div className="about-body">
			<div className="about-box">
				<form method="GET" className="user-details-form">
					<div className="image-container">
						<img src="/avatar2.png" alt="profile img" />
						<br />

						<Button className="img-btn">
							Edit profile
							<svg
								width="19"
								height="19"
								viewBox="0 0 19 19"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1.41999 18.579C1.13948 18.5785 0.872062 18.4603 0.682993 18.253C0.490439 18.0475 0.394758 17.7695 0.419993 17.489L0.664993 14.795L11.983 3.48103L15.52 7.01703L4.20499 18.33L1.51099 18.575C1.47999 18.578 1.44899 18.579 1.41999 18.579ZM16.226 6.31003L12.69 2.77403L14.811 0.653028C14.9986 0.465251 15.2531 0.359741 15.5185 0.359741C15.7839 0.359741 16.0384 0.465251 16.226 0.653028L18.347 2.77403C18.5348 2.9616 18.6403 3.21612 18.6403 3.48153C18.6403 3.74694 18.5348 4.00146 18.347 4.18903L16.227 6.30903L16.226 6.31003Z"
									fill="#262626"
								/>
							</svg>
						</Button>
					</div>
					<div className="user-details-box">
						<div className="user-details-headings">
							<h1>User ID</h1>
							<h1>Name</h1>
							<h1>Email</h1>
							<h1>Phone</h1>
							<h1>Work</h1>
						</div>
						<div className="user-details">
							<h1>{userData._id}</h1>
							<h1>{userData.name}</h1>
							<h1>{userData.email}</h1>
							<h1>{userData.phone}</h1>
							<h1>{userData.work}</h1>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default About;
