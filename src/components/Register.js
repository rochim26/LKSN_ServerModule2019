import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const Register = (props) => {
    const {token, setToken} = useContext(AuthContext),
          [firstName, setFirstName] = useState(''),
          [lastName, setLastName] = useState(''),
          [username, setUsername] = useState(''),
          [password, setPassword] = useState(''),
          [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if(token) {
            props.history.push('/')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        if(password !== confirmPassword) {
            return alert('Password didnt match')
        }

        Axios.post(`http://localhost:8000/v1/auth/register`, {
            first_name: firstName,
            last_name: lastName,
            username: username,
            password: password
        })
        .then(res => {
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            setFirstName('')
            setLastName('')
            username('')
            password('')
            confirmPassword('')
        })
        .catch(err => alert(err.response.data.message))
    }

    return(
        <div>
            <div className="header">
                <div>
                    <Link to="#">Papan</Link>
                </div>
            </div>
            <div className="form">
                <header>Register</header>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                    <input required type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <input required type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <button type="submit">Register</button>
                </form>
                <Link to='/login' style={{color: 'blue'}}>Already have account? Login account</Link>
            </div>      
        </div>
    )
}

export default Register