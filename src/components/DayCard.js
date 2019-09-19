import React from "react";
import "./DayCard.css";

const DayCard = props => (
	<div className="day-container">
		<h2>{props.day}</h2>
		<span>{props.temperature} F</span>
	</div>
);

export default DayCard;