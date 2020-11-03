import React, { Component } from 'react'
import styles from './form.module.css'

import { cities } from '../../../utilities'

class RegFrom extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNameValid: true,
            isEmailValid: true,
            isDecriptionValid: true,
            isCityValid: true,
            isGenderValid: true,
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
        const emailPattern = /[a-z]+([a-z]|[0-9])*@[a-z]+\.[a-z]{2,}$/i
        const namePattern = /[a-z]+$/
        const nameRegex = RegExp(namePattern)
        const mailRegex = RegExp(emailPattern)
        console.log(nameRegex.test(this.state.name));
        console.log(mailRegex.test(this.state.email));
        if (!nameRegex.test(this.state.name) || !mailRegex.test(this.state.email) || this.state.city === 'Select a City' || this.state.gender === '') {
            this.setState({
                isNameValid: nameRegex.test(this.state.name),
                isEmailValid: mailRegex.test(this.state.email),
                isCityValid: !(this.state.city === 'Select a City'),
                isGenderValid: !(this.state.gender === '')
            })
            return
        } else {
            this.setState({
                isNameValid: true,
                isEmailValid: true,
                isCityValid: true,
                isGenderValid: true
            })
        }
        console.log(this.state);
    }


    render() {
        const { name,
            email,
            description,
            city,
            gender,
            hobbies,
            isNameValid,
            isEmailValid,
            isDecriptionValid,
            isCityValid,
            isGenderValid

        } = this.state
        return (
            <form
                method='none'
                onSubmit={this.submitHandler}
                className={styles.formGrid}>
                <div className={styles.input}>
                    <label htmlFor="name">Name</label>
                    <div style={{ width: "65%" }}>
                        <input
                            style={{ width: "100%" }}
                            required={true}
                            onChange={this.handleChange}
                            name="name"
                            placeholder="Enter your name"
                            className={styles.textInputField}
                            value={name}
                        />
                        <p
                            style={{
                                fontSize: "10px",
                                margin: '2px',
                                color: 'red',
                                display: isNameValid ? 'none' : 'block'
                            }}
                        >
                            Name doesnt match the format
                        </p>
                    </div>
                </div>
                <div className={styles.input}>
                    <label htmlFor="email">Email</label>
                    <div style={{ width: "65%" }}>
                        <input
                            style={{ width: "100%" }}
                            required={true}
                            onChange={this.handleChange}
                            name="email"
                            placeholder="Enter your email"
                            className={styles.textInputField}
                            value={email}
                        />

                        <p
                            style={{
                                fontSize: "10px",
                                margin: '2px',
                                color: 'red',
                                display: isEmailValid ? 'none' : 'block'
                            }}
                        >
                            Email doesnt match the format
                        </p>

                    </div>
                </div>
                <div
                    style={{
                        gridColumn: "1 /span 2",
                        rowSpan: "1/span 3",
                    }}>


                    <div>
                        <label
                            style={{ marginLeft: "30px" }}
                            htmlFor="description">
                            Description
                    </label>
                        <p
                            style={{
                                fontSize: "10px",
                                margin: '2px',
                                marginLeft: '30px',
                                color: 'red',
                                display: isDecriptionValid ? 'none' : 'block'
                            }}
                        >
                            Description doesnt match the format
                        </p>
                    </div>

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
                        value={description}
                        maxLength="200"
                    />
                </div>

                <div className={styles.input}>
                    <div>
                        <label
                            htmlFor="city">
                            Select a City
                    </label>
                        <p
                            style={{
                                fontSize: "10px",
                                margin: '2px',
                                color: 'red',
                                display: isCityValid ? 'none' : 'block'
                            }}
                        >
                            City is invalid
                        </p>
                    </div>



                    <select
                        required={true}
                        value={city}
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
                            cities.map(
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
                            checked={gender === 'male'}
                        />
                        <label htmlFor="female">Female</label>
                        <input
                            onChange={this.handleChange}
                            type="radio"
                            name="gender"
                            value="female"
                            checked={gender === 'female'}
                        />
                        <p
                            style={{
                                fontSize: "10px",
                                margin: '2px',
                                color: 'red',
                                display: isGenderValid ? 'none' : 'block'
                            }}
                        >
                            Select a Gender
                        </p>
                    </div>
                    <div>
                        <label
                            htmlFor="hobbies">
                            Hobbies:
                        </label><br />
                        {
                            hobbies.map(
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
}


export default RegFrom
