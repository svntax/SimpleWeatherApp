import React from "react";
import "./App.css";

import DayCard from "./DayCard";
import SearchForm from "./SearchForm";

import {kelvinToFarenheit} from "./utils.js";

class App extends React.Component {
	
	constructor(props){
		super(props);
		
		this.state = {
			temperature: undefined,
			city: undefined,
			country: undefined
		};
	}
	
	componentDidMount(){
		let lastLocation = localStorage.getItem("savedLocation");
		//TODO need to validate data, using ?? placeholder for now
		if(lastLocation){
			this.getWeatherDataFromLocalStorage();
		}
		else{
			console.log("No saved location");
		}
	}
	
	getWeatherDataFromLocalStorage = () => {
		console.log("Got data from localStorage");
		this.setState({
			temperature: kelvinToFarenheit(localStorage.getItem("temperature")).toFixed(2) || "??",
			city: localStorage.getItem("city") || "??",
			country: localStorage.getItem("country") || "??"
		});
	}
	
	getWeather = (city, countryCode) => {
		//TODO carefully validate search query so it doesn't trigger repetitive API calls
		let place = city.toLowerCase().trim() + "," + countryCode.toUpperCase().trim();
		let lastLocation = localStorage.getItem("savedLocation");
		if(lastLocation && lastLocation === place){
			//Search query is the same, don't call the API again TODO until the API has updated with new data
			console.log("Search query was the same as last time");
			this.getWeatherDataFromLocalStorage();
		}
		else if(city && countryCode){
			console.log("New location searched");
			localStorage.setItem("savedLocation", place);
			const apiKey = process.env.OPEN_WEATHER_MAP_API_KEY;
			const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apiKey;
			//TODO need to handle 404
			fetch(url)
			.then(response => {	return response.json(); })
			.then(data => {
				console.log(data);
				this.setState({
					temperature: kelvinToFarenheit(data.main.temp).toFixed(2),
					city: data.name,
					country: countryCode
				});
				//Save API response data to localStorage
				localStorage.setItem("temperature", data.main.temp);
				localStorage.setItem("city", data.name);
				localStorage.setItem("country", countryCode);
			})
			.catch(err => {
				console.log(err);
			});
		}
		else{
			console.log("Invalid city or country code");
		}
	}
	
	render(){
		return (
			<div className="app">
				<h1>Simple Weather App</h1>
				<SearchForm loadWeather={this.getWeather} />
				<div className="week-container">
					<DayCard day="Sunday" temperature={this.state.temperature} />
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