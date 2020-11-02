import React, { Component } from 'react'
import styles from './form.module.css'

export default class from extends Component {
    render() {
        return (
            <form
                method='none'
                onSubmit={this.submitHandler}
                className={styles.formGrid}>
                <div className={styles.input}>
                    <label htmlFor="name">Name</label>
                    <input
                        required={true}
                        onChange={this.handleChange}
                        name="name"
                        placeholder="Enter your name"
                        className={styles.textInputField}
                        value={this.state.name}
                    />
                </div>
                <div className={styles.input}>
                    <label htmlFor="email">Email</label>
                    <input
                        required={true}
                        onChange={this.handleChange}
                        name="email"
                        placeholder="Enter your email"
                        className={styles.textInputField}
                        value={this.state.email}
                    />
                </div>
                <div
                    style={{
                        gridColumn: "1 /span 2",
                        rowSpan: "1/span 3",
                    }}>
                    <label
                        style={{ marginLeft: "30px" }}
                        htmlFor="description">
                        Description
                    </label>
                    <textarea
                        required={true}
                        onChange={this.handleChange}
                        name="description"
                        placeholder="Describe Yourself"
                        style={{
                            resize: "none",
                            boxSizing: 'border-box',
                            height: '20vh',
                            width: "95%",
                            padding: "10px",
                            marginTop: "10px",
                            marginLeft: "25px"
                        }}
                        value={this.state.description}
                    />
                </div>

                <div className={styles.input}>

                    <label
                        htmlFor="city">
                        Select a City
                    </label>


                    <select
                        required={true}
                        value={this.state.city}
                        onChange={this.handleChange}
                        name="city"
                        style={{
                            padding: "0.4rem",
                            width: '50%',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            backgroundColor: 'white'
                        }}
                    >
                        <option
                            value="Select a City"
                            key="Select a City"
                            disabled
                        >
                            Select a City
                        </option>
                        {
                            this.cities.map(
                                city => (
                                    <option
                                        key={city}
                                        value={city}>
                                        {city}
                                    </option>
                                )
                            )
                        }
                    </select>

                </div>

                <div className={styles.input}>
                    <div>
                        <label htmlFor="gender">
                            Gender:
                            </label><br />
                        <label htmlFor="male">Male</label>
                        <input
                            onChange={this.handleChange}
                            type="radio"
                            name="gender"
                            value="male"
                            checked={this.state.gender === 'male'}
                        />
                        <label htmlFor="female">Female</label>
                        <input
                            onChange={this.handleChange}
                            type="radio"
                            name="gender"
                            value="female"
                            checked={this.state.gender === 'female'}
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="hobbies">
                            Hobbies:
                        </label><br />
                        {
                            this.state.hobbies.map(
                                hobby => (
                                    <div>
                                        <input
                                            onChange={this.handleChange}
                                            key={hobby.name}
                                            type="checkbox"
                                            name='hobbies'
                                            value={hobby.name}
                                            checked={hobby.isSelected}
                                        />
                                        <label htmlFor={hobby.name}>
                                            {hobby.name}
                                        </label>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
                <button
                    type="submit"
                    style={{
                        backgroundColor: "white",
                        gridColumn: "1/span 2",
                        width: '7%',
                        padding: "0.4rem",
                        borderRadius: '6px',
                        marginLeft: "45%"
                    }}
                >
                    Submit
                </button>

            </form>
        )
    }

    cities = [
        'Vadodara',
        'Ahmedabad',
        'Bharuch',
        'Gandhinagar',
        'Delhi',
        'Bombay',
        'Bangalore'
    ]

    hobbies = [
        'Music',
        'Webseries',
        'Coding',
        'Reading'
    ]

    handleChange = (event) => {
        const modified = {}
        if (event.target.name === 'hobbies') {
            const hobbies = [...this.state.hobbies]
            hobbies.forEach(elem => {
                if (elem.name === event.target.value)
                    elem.isSelected = !elem.isSelected
            })
            modified[event.target.name] = hobbies
        } else {
            modified[event.target.name] = event.target.value
        }
        this.setState(modified)
    }

    submitHandler = (event) => {
        event.preventDefault()
        const emailPattern = /[a-z]+([a-z]|[0-9])*@[a-z]+\.[a-z]+/i
        const mailRegex = RegExp(emailPattern)
        if (!mailRegex.exec(this.state.email)) {
            alert('Please Enter a Valid Email')
            return
        }
        if (this.state.city === 'Select a City') {
            alert('Please Select a City')
            return
        }
        if (this.state.gender === '') {
            alert('Please Select a Gender')
            return
        }
        console.log(this.state);
    }

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            email: '',
            description: '',
            city: 'Select a City',
            gender: '',
            hobbies: [
                {
                    name: 'Music',
                    isSelected: false
                },
                {
                    name: 'Webseries',
                    isSelected: false
                },
                {
                    name: 'Coding',
                    isSelected: false
                },
                {
                    name: 'Reading',
                    isSelected: false
                }
            ]
        }
    }

}
