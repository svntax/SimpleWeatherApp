import React from "react";
import "./DayCard.css";

const DayCard = props => (
	<div className="day-container">
		<div><span className="day-container__day">{props.day}</span></div>
		<div className="weather-icon">
			<img src={"http://openweathermap.org/img/wn/" + props.weatherIcon + "@2x.png"} />
		</div>
		<div className="day-container__description">
			<span>{props.description}</span>
		</div>
		<span>{props.temperature}°F</span>
	</div>
);

export default DayCard;