import React, { Component } from 'react'
import styles from './styles.module.css'
const apiKey = '7410d796a0a2c082e2825ccbe75db08c'

class WeatherData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cityName: '',
            isFetching: false,
            weatherData: 'NODATA'
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
        this.setState({ isFetching: true })
        let data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
        try {
            const response = await fetch(url)
            data = await response.json()
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        this.setState({
            isFetching: false,
            weatherData: data
        })
    }

    render() {
        const { cityName, weatherData, isFetching } = this.state
        return (
            <div className={styles.weatherBox}>
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
                        isFetching ? <h1>Loading</h1> :
                            weatherData === 'NODATA' ? '' : (
                                <div>
                                    <h2>
                                        City: {weatherData.name}
                                    </h2>
                                    <h3>
                                        {weatherData.weather[0].main}
                                    </h3>
                                    <p>
                                        {weatherData.weather[0].description}
                                    </p>
                                </div>
                            )
                    }
                </div>
            </div>
        )
    }
}

export default WeatherData
