export function kelvinToFarenheit(k){
	return 1.8 * (k - 273) + 32;
}

export function kelvinToCelsius(k){
	return k - 273.15;
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
export function getDayOfWeek(i){
	if(i < 0 || i > 6){
		return "Invalid day, must be in range [0, 6]";
	}
	return DAYS[i];
}