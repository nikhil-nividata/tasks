import React, { Component } from 'react'
import styles from './styles.module.css'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import isBetween from 'dayjs/plugin/isBetween'


dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isBetween)



const apiKey = '7410d796a0a2c082e2825ccbe75db08c'


class WeatherData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cityName: '',
            isFetching: false,
            weatherData: 'NODATA',
            error: ''
        }
    }

    handleChange = (event) => {
        const modifiedObject = {}
        modifiedObject[event.target.name] = event.target.value
        this.setState(
            modifiedObject)
    }

    getData = async () => {
        const { cityName } = this.state
        if (cityName === '')
            return
        this.setState({ isFetching: true, error: '' })
        let data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        try {
            const response = await fetch(url)
            data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        if (data.cod !== '404')
            this.setState({
                isFetching: false,
                weatherData: data
            })
        else {
            this.setState({
                isFetching: false,
                error: 'City Not Found'
            })
        }
    }


    // dayjs((new Date()).getTime() + weatherData.timezone * 1000).isBetween(dayjs.unix(weatherData.sys.sunrise + weatherData.timezone), dayjs.unix(weatherData.sys.sunset + weatherData.timezone))


    render() {
        const { cityName, weatherData, isFetching, error } = this.state
        return (
            <div className={styles.weatherBox}
                style={{
                    backgroundColor: isFetching || weatherData === 'NODATA' ? 'white' :
                        error !== '' ? 'red' :
                            dayjs((new Date()).getTime() + weatherData.timezone * 1000)
                                .isBetween(
                                    dayjs.unix(
                                        weatherData.sys.sunrise + weatherData.timezone
                                    ),
                                    dayjs.unix(
                                        weatherData.sys.sunset + weatherData.timezone
                                    )
                                ) ? 'rgb(235, 227, 82)' : 'rgb(0, 51, 237)',
                    color: isFetching || weatherData === 'NODATA' ? 'white' :
                        error !== '' ? 'red' :
                            dayjs((new Date()).getTime() + weatherData.timezone * 1000)
                                .isBetween(
                                    dayjs.unix(
                                        weatherData.sys.sunrise + weatherData.timezone
                                    ),
                                    dayjs.unix(
                                        weatherData.sys.sunset + weatherData.timezone
                                    )
                                ) ? 'black' : 'white'
                }}
            >
                <input
                    type="text"
                    name="cityName"
                    value={cityName}
                    onChange={this.handleChange}
                    className={styles.cityInput}
                />
                <button
                    onClick={this.getData}
                    className={styles.button}
                >
                    Get Weather
                </button>
                <div>
                    {
                        error !== '' ? (<h2>
                            City Data does not exist
                        </h2>) :
                            isFetching ? <h1>Loading</h1> :
                                weatherData === 'NODATA' ? '' : (
                                    <div>
                                        <h2>
                                            {weatherData.name}
                                        </h2>
                                        <div style={{
                                            display: "flex",
                                            alignContent: 'center',
                                            justifyContent: 'center'
                                        }}>
                                            <img
                                                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                                                style={{
                                                    marginTop: '0.5rem',
                                                    height: '3rem'
                                                }}
                                                alt="" />

                                            {

                                                (weatherData.main.temp_max === weatherData.main.temp_min) ?
                                                    (<h2> {(weatherData.main.temp_max - 273).toFixed(2)} </h2>) :
                                                    (<h2> {(weatherData.main.temp_min - 273).toFixed(2)} &#8451; -
                                                        {(weatherData.main.temp_max - 273).toFixed(2)} &#8451; </h2>)

                                            }
                                        </div>
                                        <div>
                                            <h2>
                                                {`Current Temperature ${(weatherData.main.temp_max - 273).toFixed(2)}`}&#8451;
                                        </h2>
                                        </div>
                                        <div>
                                            <h4>
                                                Sunrise
                                                {
                                                    ' ' + dayjs.unix(weatherData.sys.sunrise + weatherData.timezone).utc().format('HH:mm') + ' - '}
                                                Sunset
                                                {
                                                    ' ' + dayjs.unix(weatherData.sys.sunset + weatherData.timezone).utc().format('HH:mm') + ' '
                                                }
                                            </h4>
                                        </div>
                                        <div>
                                            <h4>
                                                {`Humidity ${weatherData.main.humidity}%`}
                                            </h4>
                                        </div>
                                        <div>
                                            <h4>
                                                {`Pressure ${weatherData.main.pressure} hPa`}
                                            </h4>
                                        </div>
                                        <div>
                                            <h4>
                                                {`Windspeed ${(weatherData.wind.speed * 3.6).toFixed(2)} km/hr`}
                                            </h4>
                                        </div>
                                    </div>
                                )
                    }
                </div>
            </div>
        )
    }
}

export default WeatherData
