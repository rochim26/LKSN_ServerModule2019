import React, {useContext} from 'react'
import {NavLink} from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const Navbar = () => {
    const {token, setToken} = useContext(AuthContext)

    const handleLogout = (e) => {
        e.preventDefault()

        Axios.get(`http://localhost:8000/v1/auth/logout?token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            alert(res.data.message)
            setToken('')
            localStorage.removeItem('token')
        })
        .catch(err => alert(err.response.data.message))
    }

    return token ? (
        <div className="header">
            <div>
                <NavLink to="/">Home</NavLink>
            </div>
            <div className="right">
                <NavLink to="/">John Doe</NavLink>
                <NavLink onClick={handleLogout} to="#">Logout</NavLink>
            </div>
        </div>
    ) : null
}

export default Navbar