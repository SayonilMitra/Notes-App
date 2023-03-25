import './loginPage.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function LoginPage() {

    let backendLink = require('../server/backendLink')
    let navigate = useNavigate()

    // store user email as username
    let [userName, setUserName] = useState('')
    let [password, setPassword] = useState('')

    // send login data to data base
    async function loginUser() {
        if (userName === '' || password === '') {
            alert('Email and Password Can not be empty')
        } else if (validEmailCheck(userName)) {
            alert('Please provide valid email')
        } else {
            await axios.post(`${backendLink}/login`, {
                userName: userName,
                password: password
            }).then(res => {
                if (res.data.status === 'ok') {
                    navigate('/homepage')
                    localStorage.setItem('userId', res.data.loggedInUserId)
                } else {
                    alert('User details incorrect. Sign Up for new Account')
                }
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
        <h1>Sign In</h1>
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
        <div>
            <input type='checkbox' id='sign-in-checkbox' />Remember me
        </div>
        <button id='sign-in-btn' onClick={loginUser}>Submit</button> <br />
        <button id='sign-up-btn' onClick={() => { navigate('/signUp') }}>Create Account</button>
    </div>

}

export default LoginPage