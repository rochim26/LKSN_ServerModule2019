import React, {useContext, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const Login = (props) => {
    const {token, setToken} = useContext(AuthContext),
          [username, setUsername] = useState(''),
          [password, setPassword] = useState('')

    useEffect(() => {
        if(token) {
            props.history.push('/')
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(username)
        console.log(password)

        Axios.post(`http://localhost:8000/v1/auth/login`, {
            username: username,
            password: password
        })
        .then(res => {
            setToken(res.data.token)
            localStorage.setItem('token', res.data.token)
            setUsername('')
            setPassword('')
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
                <header>Login</header>
                <form onSubmit={handleSubmit}>
                    <input required type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input required type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <button type="submit">Login</button>
                </form>
                <Link to='/register' style={{color: 'blue'}}>Haven't join yet? Create account</Link>
            </div>
        </div>
    )
}

export default Login