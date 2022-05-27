import React, { useState, useEffect } from "react";
import "./Navbar.css";
import Button from "@mui/material/Button";
import { NavLink, useHistory } from "react-router-dom";

function Navbar() {
	const history = useHistory();

	const [userData, setUserData] = useState({});
	const [loggedIN, setLoggedIn] = useState(false);

	const Navbar = async () => {
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

			setLoggedIn(true);
		} catch (err) {
			console.log(err);
			history.push("/login");
		}
	};

	useEffect(() => {
		Navbar();
	}, []);

	return (
		<nav>
			<h2 style={{ cursor: "pointer" }} onClick={() => history.push("/")}>
				Ur Notes
			</h2>
			<ul className="nav-list">
				<li>
					<NavLink
						activeClassName="active-nav-link"
						className="nav-link"
						to="/"
					>
						Home
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active-nav-link"
						className="nav-link"
						to="/about"
					>
						About Me
					</NavLink>
				</li>

				<li>
					<NavLink
						activeClassName="active-nav-link"
						className="nav-link"
						to="/message"
					>
						Message
					</NavLink>
				</li>

				<li>
					<NavLink className="nav-link" to="/logout">
						Logout
					</NavLink>
				</li>

				<li>
					<Button
						className="btn "
						onClick={() => {
							history.push("/login");
						}}
					>
						Login
						<svg
							className="login"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12.0001 22C10.4882 22.0043 8.99532 21.6622 7.6361 21C7.13865 20.758 6.66203 20.4754 6.2111 20.155L6.0741 20.055C4.83392 19.1396 3.81997 17.9522 3.1101 16.584C2.37584 15.1679 1.99501 13.5952 2.00005 12C2.00005 6.47715 6.47725 2 12.0001 2C17.5229 2 22.0001 6.47715 22.0001 12C22.0051 13.5944 21.6247 15.1664 20.8911 16.582C20.1822 17.9494 19.1697 19.1364 17.9311 20.052C17.4639 20.394 16.968 20.6951 16.4491 20.952L16.3691 20.992C15.009 21.6577 13.5144 22.0026 12.0001 22ZM12.0001 17C10.5016 16.9971 9.12776 17.834 8.4431 19.167C10.6845 20.2772 13.3157 20.2772 15.5571 19.167V19.162C14.8716 17.8305 13.4977 16.9954 12.0001 17ZM12.0001 15C14.1662 15.0028 16.1635 16.1701 17.2291 18.056L17.2441 18.043L17.2581 18.031L17.2411 18.046L17.2311 18.054C19.7601 15.8691 20.6644 12.3423 19.4987 9.21011C18.3331 6.07788 15.3432 4.00032 12.0011 4.00032C8.65901 4.00032 5.66909 6.07788 4.50345 9.21011C3.33781 12.3423 4.2421 15.8691 6.7711 18.054C7.83736 16.169 9.83446 15.0026 12.0001 15ZM12.0001 14C9.79096 14 8.0001 12.2091 8.0001 10C8.0001 7.79086 9.79096 6 12.0001 6C14.2092 6 16.0001 7.79086 16.0001 10C16.0001 11.0609 15.5787 12.0783 14.8285 12.8284C14.0784 13.5786 13.061 14 12.0001 14ZM12.0001 8C10.8955 8 10.0001 8.89543 10.0001 10C10.0001 11.1046 10.8955 12 12.0001 12C13.1047 12 14.0001 11.1046 14.0001 10C14.0001 8.89543 13.1047 8 12.0001 8Z"
								fill="#7CD745"
							></path>
						</svg>
					</Button>
				</li>

				<li>
					<Button
						className="btn"
						onClick={() => {
							history.push("/signup");
						}}
					>
						Sign Up
						<svg
							className="signup"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 19H2C2 15.6863 4.68629 13 8 13C11.3137 13 14 15.6863 14 19H12C12 16.7909 10.2091 15 8 15C5.79086 15 4 16.7909 4 19ZM19 16H17V13H14V11H17V8H19V11H22V13H19V16ZM8 12C5.79086 12 4 10.2091 4 8C4 5.79086 5.79086 4 8 4C10.2091 4 12 5.79086 12 8C11.9972 10.208 10.208 11.9972 8 12ZM8 6C6.9074 6.00111 6.01789 6.87885 6.00223 7.97134C5.98658 9.06383 6.85057 9.9667 7.94269 9.99912C9.03481 10.0315 9.95083 9.1815 10 8.09V8.49V8C10 6.89543 9.10457 6 8 6Z"
								fill="#7CD745"
							></path>
						</svg>
					</Button>
				</li>
			</ul>

			{/* new nav list */}
		</nav>
	);
}

export default Navbar;
