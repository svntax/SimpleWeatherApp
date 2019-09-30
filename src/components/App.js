import React from "react";
import "./App.css";

import DayCard from "./DayCard";
import SearchForm from "./SearchForm";

import {kelvinToFarenheit, getDayOfWeek} from "./utils.js";

class App extends React.Component {
	
	constructor(props){
		super(props);
		
		const daysForecast = [];
		for(let i = 0; i < 5; i++){ //5-day forecast
			daysForecast.push({
				day: "Some Day",
				temperature: 0
			});
		}
		
		this.state = {
			city: undefined,
			country: undefined,
			days: daysForecast
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
			//temperature: kelvinToFarenheit(localStorage.getItem("temperature")).toFixed(2) || "??",
			city: localStorage.getItem("city") || "??",
			country: localStorage.getItem("country") || "??",
			days: JSON.parse(localStorage.getItem("forecast")) || []
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
			//const url = "https://api.openweathermap.org/data/2.5/weather?q=" + place + "&appid=" + apiKey;
			const url = "https://api.openweathermap.org/data/2.5/forecast?q=" + place + "&appid=" + apiKey;
			//TODO need to handle 404
			fetch(url)
			.then(response => {	return response.json(); })
			.then(data => {
				console.log(data);
				
				const timezoneShift = data.city.timezone;
				
				let currentDayTempSet = false;
				let currentDay = "";
				let currentDayIndex = -1;
				let daysForecast = [];
				for(let i = 0; i < data.list.length; i++){
					const forecastData = data.list[i];
					const utcDate = new Date(forecastData.dt_txt);
					const localDate = new Date(utcDate.getTime() + (timezoneShift * 1000));
					const localHour = localDate.getHours();
					const dayOfWeek = localDate.getDay();
					//If we're on a new day/the next day, update 
					if(currentDay !== dayOfWeek){
						console.log("New day: " + dayOfWeek);
						currentDayTempSet = false; //It's a new day, so we need to find the temp again
						currentDay = dayOfWeek;
						currentDayIndex++;
						daysForecast.push({day: getDayOfWeek(dayOfWeek), temperature: 0});
					}
					if(!currentDayTempSet){
						if(11 <= localHour && localHour < 14){
							//Hard-coded to make the day temperature based on forecast between 11am and 2pm
							currentDayTempSet = true;
							daysForecast[currentDayIndex].temperature = kelvinToFarenheit(forecastData.main.temp).toFixed(2);
							console.log("Temp for " + getDayOfWeek(dayOfWeek) + " is " + forecastData.main.temp);
						}
					}
				}
				/*let utcDate = new Date(data.list[0].dt_txt);
				let date = new Date(utcDate.getTime() + (timezoneShift*1000));
				console.log(utcDate);
				console.log(date);*/
				
				//Save API response data to localStorage
				localStorage.setItem("city", data.city.name);
				localStorage.setItem("country", countryCode);
				console.log(daysForecast);
				localStorage.setItem("forecast", JSON.stringify(daysForecast));
				this.setState({
					days: daysForecast
				});
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
					{this.state.days.map((item, index) => (
						<DayCard key={index} day={item.day} temperature={item.temperature} />
					))}
				</div>
			</div>
		);
	}
	
}

export default App;