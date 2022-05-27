import React from "react";
import "./Error.css";
import Button from "@mui/material/Button";

function Error() {
	return (
		<div className="error-body">
			<div className="error-box">
				<h1 className="error-background">404</h1>
				<h1 className="error-heading">Whoops! Lost in Space?</h1>
				<p className="error-paragraph">
					The page you're looking for isn't found :( <br /> We suggest you back
					to home
				</p>
				<Button className="error-button">Back to Home</Button>
			</div>
		</div>
	);
}

export default Error;
