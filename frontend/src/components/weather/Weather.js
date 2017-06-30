import React from 'react';
import './css/weather-icons-wind.css';
import './css/weather-icons-wind.min.css';
import './css/weather-icons.css';
import './css/weather-icons.min.css';
import './css/style.css'
import './font/weathericons-regular-webfont.eot';
import './font/weathericons-regular-webfont.svg';
import './font/weathericons-regular-webfont.ttf';
import './font/weathericons-regular-webfont.woff';
import './font/weathericons-regular-webfont.woff2';
import {getWindDegIcon,getBackgroundColor,convertCtoF} from './actions';
import axios from 'axios';

const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiUrl = '&appid=9deb1490da7395429f58c27e7cf9746c';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = { wind: {} }
    }

    static getType() {
        return "Weather";
    }

    getWeather(props) {
        let url = rootUrl + props.city + apiUrl;
        axios.get(url)
            .then(res => {
                this.setState({
                    temp: Math.round(res.data.main.temp - 273.15),
                    humidity: res.data.main.humidity,
                    wind: {
                        speed: res.data.wind.speed,
                        iconDeg : getWindDegIcon(res.data.wind.deg)
                    },
                    icon: res.data.weather[0].id,
                });
            })
    }

    render() {
        const weatherClass = 'wi wi-owm-' + this.state.icon;
        const backgroundColorClass = "weather-widget " + getBackgroundColor(this.state.temp);
        const windIcon = "wi wi-wind " + this.state.wind.iconDeg;
        const tempShow = this.state.temp
              ? this.props.degrees === "F"
                ? convertCtoF(this.state.temp)
                : this.state.temp
              : undefined;
        return (
            <div className="wrapper">
                <div className={backgroundColorClass}>
                    <h1 className="city">{this.props.city}</h1>
                    <div className="weather">
                        <i className={weatherClass}></i>
                    </div>
                    <section className="weather-details">
                        <div className="temp">
                            <p><span className="temp-number">{tempShow}</span>
                               <span className="wi wi-degrees"></span>
                               <span className="degrees">{this.props.degrees}</span>
                            </p>
                        </div>
                        <div className="space"></div>
                        <div className="wind-humidity">
                            <div className="humidity"><i className="wi wi-raindrop"></i><p>{this.state.humidity}%</p></div>
                            <div className="wind">
                                <i className={windIcon}></i>
                                <p>{this.state.wind.speed}<span className="vel">m/s</span></p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }

    componentWillReceiveProps(nextProps){
        this.getWeather(nextProps);
    }

    componentDidMount() {
        this.getWeather(this.props);
    }
}
export default Weather;