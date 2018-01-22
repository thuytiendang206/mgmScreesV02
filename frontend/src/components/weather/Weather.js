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
import { getWindDegIcon, getBackgroundColor, convertCtoF, getStyles } from './actions';
import axios from 'axios';

const rootUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiUrl = '&appid=9deb1490da7395429f58c27e7cf9746c';

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.state = { wind: {} }
    }

    getWeather(props) {
        let url = rootUrl + props.city + apiUrl;
        axios.get(url)
            .then(res => {
                this.setState({
                    temp: Math.round(res.data.main.temp - 273.15),
                    humidity: res.data.main.humidity,
                    wind: {
                        speed: res.data.wind.speed.toFixed(1),
                        iconDeg: getWindDegIcon(res.data.wind.deg)
                    },
                    icon: res.data.weather[0].id,
                });
            })
    }

    render() {
        const weatherClass = 'weather-icon wi wi-owm-' + this.state.icon;
        const backgroundColorClass = "weather-widget " + getBackgroundColor(this.state.temp);
        const windIcon = "wi wi-wind " + this.state.wind.iconDeg;
        const tempShow = this.state.temp !== undefined
            ? this.props.params.degrees === "F"
                ? convertCtoF(this.state.temp)
                : this.state.temp
            : undefined;
        const styles = getStyles(this.props.widthSize, this.props.heightSize)
        return (
            <div className={backgroundColorClass} style={styles.parentsSize} >
                <h1 className="city" style={styles.city}>{this.props.params.city}</h1>
                <div className='weather' style={styles.weather}>
                    <i className={weatherClass} style={styles.wi}/>
                </div>
                <div className="weather-details" style={styles.weatherDetail}>
                    <div className="left-side">
                        <div className="temp" style={styles.temp}>
                            <p className="temp-number">{tempShow}
                                <span className="wi wi-degrees"/>{this.props.params.degrees}
                            </p>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="humidity" style={styles.humidity}>
                            <p><i className="wi wi-raindrop"/><span className="numbers">{this.state.humidity}</span> <span>%</span></p>
                        </div>
                        <div className="wind" style={styles.wind}>
                            <p> <i className={windIcon}/>
                                <span className="numbers">{this.state.wind.speed} </span>
                                <span className="vel"> m/s</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.getWeather(this.props.params);
    }
}

export default Weather;
