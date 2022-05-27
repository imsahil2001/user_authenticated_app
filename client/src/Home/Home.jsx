import React, { useState, useEffect } from "react";
import "./Home.css";
import Button from "@mui/material/Button";

function Home() {
	// this is the code to add blog data to the data base
	const [data, setdata] = useState({
		title: "",
		description: "",
	});

	const [loggedIN, setloggedIN] = useState({ status: false, name: "" });

	// const [addData, setaddData] = useState([{}]);
	const [addData, setaddData] = useState([{}]);

	const handleInputs = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setdata({
			...data,
			[name]: value,
		});
	};

	// now we have to get the data of the blog on our screen from server

	const GetBlog = async () => {
		try {
			const res = await fetch("/getblog", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const inputdata = await res.json();
			const blogdata = inputdata.blogs;
			setaddData(blogdata);
			setloggedIN({ status: true, name: inputdata.name });

			if (!res.status === 200) {
				const error = new Error(res.error);
				console.log(error);
				alert(error);
			}
		} catch (e) {
			console.log("error from the get method of blog  " + e);
		}
	};

	// GetBlog();

	useEffect(() => {
		GetBlog();
	}, []);

	const submitform = async (e) => {
		e.preventDefault();

		const { title, description } = data;

		const res = await fetch("/blogpost", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ title, description }),
		});

		const inputdata = await res.json();
		// console.log(inputdata);

		if (inputdata.error !== undefined) {
			alert(inputdata.error);
		} else {
			alert("Blog added successfully");
			setdata({ ...data, title: "", description: "" });
			setaddData([...addData, data]);
			GetBlog();
		}
	};

	const Note = () => {
		return (
			<div className="note-grid">
				{addData.map((val, id) => {
					return (
						<div className="note">
							<p className="note-date">
								{val.date === undefined ? "Just now" : val.date}
							</p>
							<h4 className="note-title">{val.title}</h4>
							<p className="note-des">{val.description}</p>
						</div>
					);
				})}
			</div>
		);
	};

	return (
		<>
			<div
				className="home-body"
				style={loggedIN.status ? {} : { height: "90vh" }}
			>
				{loggedIN.status ? (
					<>
						<h1 className="home-heading">
							Create Note&nbsp;
							<svg
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M4.41999 20.579C4.13948 20.5785 3.87206 20.4603 3.68299 20.253C3.49044 20.0475 3.39476 19.7695 3.41999 19.489L3.66499 16.795L14.983 5.48103L18.52 9.01703L7.20499 20.33L4.51099 20.575C4.47999 20.578 4.44899 20.579 4.41999 20.579ZM19.226 8.31003L15.69 4.77403L17.811 2.65303C17.9986 2.46525 18.2531 2.35974 18.5185 2.35974C18.7839 2.35974 19.0384 2.46525 19.226 2.65303L21.347 4.77403C21.5348 4.9616 21.6403 5.21612 21.6403 5.48153C21.6403 5.74694 21.5348 6.00146 21.347 6.18903L19.227 8.30903L19.226 8.31003Z"
									fill="#53AE1C"
								/>
							</svg>
						</h1>

						<form
							className="home-form"
							method="post"
							enctype="multipart/form-data"
						>
							<input
								className="form-title"
								type="text"
								name="title"
								onChange={handleInputs}
								value={data.title}
								placeholder="Title"
							/>

							<textarea
								className="form-text"
								type="text"
								name="description"
								onChange={handleInputs}
								placeholder="Description"
								value={data.description}
							/>

							<Button
								className="home-form-btn"
								type="submit"
								onClick={submitform}
							>
								Submit
							</Button>
						</form>
					</>
				) : (
					""
				)}

				{loggedIN.status ? (
					<div className="home-welcome-message">
						<h1>Hi {loggedIN.name}</h1>
						<h3>Happy to see you back</h3>
					</div>
				) : (
					""
				)}

				<div className="home-notes-body">
					<h1>Your Notes</h1>

					{loggedIN.status ? (
						<Note />
					) : (
						<h1
							className="logged-out-msg"
							style={{ color: "#6C6C6C", fontWeight: 400, fontSize: "1.2rem" }}
						>
							Please login to see your notes or Sign up if you want to make some
						</h1>
					)}
				</div>
			</div>
		</>
	);
}

export default Home;
