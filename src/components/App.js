import React from "react";
import "./App.css";

import DayCard from "./DayCard";

class App extends React.Component {
	
	constructor(props){
		super(props);
	}
	
	render(){
		return (
			<div className="app">
				<h1>Simple Weather App</h1>
				<div className="week-container">
					<DayCard day="Sunday" temperature={78} />
					<DayCard day="Monday" temperature={85} />
					<DayCard day="Tuesday" temperature={89} />
					<DayCard day="Wednesday" temperature={93} />
					<DayCard day="Thursday" temperature={91} />
					<DayCard day="Friday" temperature={108} />
					<DayCard day="Saturday" temperature={93} />
				</div>
			</div>
		);
	}
	
}

export default App;