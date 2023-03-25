import './SignUp.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function SignUp() {

    let backendLink = require('../server/backendLink')
    let navigate = useNavigate()

    // store user email as username
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')
    let [repeatPassword, setRepeatPassword] = useState('')
    let [isChecked, setIsChecked] = useState(false)

    // send login data to data base
    async function signUp() {
        if (!isChecked) {
            alert('You Must Agree with terms and conditions')
            return
        }
        if (userName === '' || password === '' || repeatPassword === '') {
            alert('All fields are required')
        } else if (validEmailCheck(userName)) {
            alert('Please provide valid email')
        } else if (password !== repeatPassword) {
            alert('Password and repeat password must match')
        } else if (password.length < 8) {
            alert('Password must have at least 8 characters')
        } else {
            await axios.post(`${backendLink}/signUp`, {
                userName: userName,
                password: password
            }).then(res => {
                navigate('/login')
            })
        }
    }

    function validEmailCheck(str) {
        let arr = str.split('@')

        if (arr.length === 0) {
            return true
        } else {
            return false
        }
    }

    return <div className='sign-in'>
        <h1>Sign Up</h1>
        <label>
            Email Address <br />
            <input
                type='email' className='sign-in-input'
                placeholder="Enter email"
                onChange={(e) => {
                    setUserName(e.target.value)
                }}
            />
        </label>
        <br />
        <label>
            Password <br />
            <input
                type='text' className='sign-in-input'
                placeholder="Enter password"
                onChange={(e) => {
                    setPassword(e.target.value)
                }}
            />
        </label>
        <label>
            Repeat Password <br />
            <input
                type='text' className='sign-in-input'
                placeholder="Repeat password"
                onChange={(e) => {
                    setRepeatPassword(e.target.value)
                }}
            />
        </label>
        <div>
            <input type='checkbox' id='sign-in-checkbox'
                onChange={() => {
                    setIsChecked(prev => !prev)
                }}
            />Agree to <a href='#'>Terms and Conditions</a>
        </div>
        <button id='sign-in-btn' onClick={signUp}>Submit</button>
    </div>

}

export default SignUp