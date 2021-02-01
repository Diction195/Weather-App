import React, { Component } from 'react';
import './App.css';
import Clock from 'react-live-clock';
import WeatherInfo from './weatherInfo';

class App extends React.Component {

  state = {
    latitude: null,
    longitude: null,
    temp: null,
    locationName: null,
    country: null, 
    humidity: null,
    Visibility: null,
    windSpeed: null,
    feelsLike: null,
    maxTemp: null,
    weatherName: null
  }

  componentDidMount(){
    if(navigator.geolocation){
      this.getPositions()
    .then((position) => {
      console.log(position.coords.latitude);
      console.log(position.coords.longitude);
      // this.setState({
      //   latitude: position.coords.latitude,
      //   longitude: position.coords.longitude,
      // })
      this.getWeather(position.coords.latitude,position.coords.longitude)
    });
    }
  }

  getWeather = async (latitude, longitude) => {
    const api = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=528247880479060cfe008fdbbf95d47f`
    );
    const data = await api.json();
    console.log(data)
    this.setState({
      temp:Math.round(data.main.temp),
      locationName:data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      Visibility: data.visibility,
      windSpeed: data.wind.speed,
      feelsLike: data.main.feels_like,
      maxTemp: data.main.temp_max,
      weatherName: data.weather[0].main
    })
  }

  getPositions = () => {
    return new Promise(function(resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  render(){
    return (
      <React.Fragment>
        <div className="col-8 d-flex justify-content-center py-5">
          <div className="col-6 app-bg d-flex flex-wrap py-3">
            <div className="col-12">
              <h2 className="text-white m-0">{(this.state.locationName)}</h2>
              <p className="text-white">{(this.state.country)}</p>
            </div>
            <div className="col-12 mt-auto d-flex">
             <div className="my-auto">
             <h2 className="text-white m-0">
               <Clock format={'HH:mm:ss'} ticking={true} />
             </h2>
              <p className="text-white m-0">
                <Clock date={''} format={'dddd, MMMM DD, YYYY'} />
              </p>
             </div>
             <div className="ml-auto">
               <h1 className="text-white">{(this.state.temp)}°C</h1>
             </div>
            </div>
          </div>
          <WeatherInfo 
              humidity={this.state.humidity} 
              Visibility={this.state.Visibility}
              windSpeed={this.state.windSpeed}
              feelsLike={this.state.feelsLike}
              maxTemp={this.state.maxTemp}
              weatherName={this.state.weatherName}
          />  
        </div>
      </React.Fragment>
    );
  }
}

export default App;
