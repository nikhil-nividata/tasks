import React, { useReducer } from 'react'
import styles from '../RegForm/form.module.css'
import { cities } from '../../../utilities'

const initialState = {
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

function reducer(state, { type, payload }) {
    switch (type) {
        case 'name':
            return { ...state, name: payload }
        case 'email':
            return { ...state, email: payload }
        case 'description':
            return { ...state, description: payload }
        case 'city':
            return { ...state, city: payload }
        case 'gender':
            return { ...state, gender: payload }
        case 'hobbies':
            return {
                ...state,
                hobbies: state.hobbies.map(
                    hobby => {
                        return {
                            name: hobby.name,
                            isSelected:
                                payload === hobby.name ?
                                    !hobby.isSelected :
                                    hobby.isSelected
                        }
                    }
                )
            }
        case 'validate':
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error('IDK WHY')
    }
}


function RegForm() {

    const [state, dispatch] = useReducer(reducer, initialState)

    const handleChange = (event) => {
        dispatch({
            type: event.target.name,
            payload: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const emailPattern = /[a-z]+([a-z]|[0-9])*@[a-z]+\.[a-z]{2,}$/i
        const namePattern = /[a-z]+$/
        const nameRegex = RegExp(namePattern)
        const mailRegex = RegExp(emailPattern)
        if (!nameRegex.test(state.name) || !mailRegex.test(state.email) || state.city === 'Select a City' || state.gender === '') {
            dispatch({
                type: 'validate',
                payload: {
                    isNameValid: nameRegex.test(state.name),
                    isEmailValid: mailRegex.test(state.email),
                    isCityValid: !(state.city === 'Select a City'),
                    isGenderValid: !(state.gender === '')
                }
            }
            )
            return
        } else {
            dispatch(
                {
                    type: 'validate',
                    payload: {
                        isNameValid: true,
                        isEmailValid: true,
                        isCityValid: true,
                        isGenderValid: true
                    }
                }
            )
        }
        console.log(state);
    }
    const {
        name,
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
    } = state;
    return (
        <form
            className={styles.formGrid}
            onSubmit={handleSubmit}
        >

            <div className={styles.input}>
                <label htmlFor="name">Name</label>
                <div style={{ width: "65%" }}>
                    <input
                        style={{ width: "100%" }}
                        required={true}
                        onChange={handleChange}
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
                        onChange={handleChange}
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
                    onChange={handleChange}
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
                    onChange={handleChange}
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
                        onChange={handleChange}
                        type="radio"
                        name="gender"
                        value="male"
                        checked={gender === 'male'}
                    />
                    <label htmlFor="female">Female</label>
                    <input
                        onChange={handleChange}
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
                                        onChange={handleChange}
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

export default RegForm
