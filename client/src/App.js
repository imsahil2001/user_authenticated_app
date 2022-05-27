import "./App.css";

import Navbar from "./Navbar/Navbar";
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";
import Message from "./Message/Message";
import About from "./About/About";
import Error from "./Error/Error";
import Home from "./Home/Home";
import Logout from "./Logout";

import { Route, Switch } from "react-router-dom";

function App() {
	return (
		<>
			<Navbar />
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={SignUp} />
				<Route exact path="/message" component={Message} />
				<Route exact path="/about" component={About} />
				<Route exact path="/logout" component={Logout} />
				<Route component={Error} />
			</Switch>
		</>
	);
}

export default App;
