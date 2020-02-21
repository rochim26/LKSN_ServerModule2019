import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const AddMember = ({boardId}) => {
    const {token} = useContext(AuthContext),
          [username, setUsername] = useState('')

    
    const handleSubmit = () => {
        Axios.post(`http://localhost:8000/v1/board/${boardId}/member?token=${token}`, {
            username
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            alert(res.data.message)
            setUsername('')
        })
        .catch(err => alert(err.response.data.message))
    }

    return(
        <div className="button">
            <span onClick={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
            }}>+ Add another list</span>
            <form onSubmit={(e) => {
                e.preventDefault()
                e.target.style.display = 'none'
                e.target.previousElementSibling.style.display = 'block'
                handleSubmit()
            }} style={{display: 'none'}}>
                <input type="text" placeholder="Username" autoFocus value={username} onChange={(e) => setUsername(e.target.value)} onBlur={(e) => {
                    e.target.parentElement.style.display = 'none'
                    e.target.parentElement.previousElementSibling.style.display = 'block'
                }} />
            </form>
        </div>
    )
}

export default AddMember