import React from "react";
import "./SearchForm.css";

class SearchForm extends React.Component {

	constructor(props){
		super(props);
		
		this.state = {
			city: "",
			country: ""
		};
	}
	
	handleCityChange = (e) => {
		this.setState({city: e.target.value});
	}
	
	handleCountryChange = (e) => {
		this.setState({country: e.target.value});
	}
	
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.loadWeather(this.state.city, this.state.country);
	}
	
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				<input type="text" name="city" placeholder="City..." onChange={this.handleCityChange} />
				<input type="text" name="country" placeholder="Country..." onChange={this.handleCountryChange} />
				<button>Get Weather</button>
			</form>
		);
	}

}

export default SearchForm;