import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const AddList = ({boardId}) => {
    const {token} = useContext(AuthContext),
          [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        Axios.post(`http://localhost:8000/v1/board/${boardId}/list?token=${token}`, {
            name
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            alert(res.data.message)
            setName('')
        })
        .catch(err => alert(err.response.data.message))
    }

    return(
        <div className="list button">
            <span onClick={(e) => {
                e.target.style.display='none'
                e.target.nextElementSibling.style.display="block"
            }}>+ Add another list</span>
            <form onSubmit={handleSubmit} style={{display: 'none'}}>
                <input type="text" placeholder="New List Name" value={name} onChange={(e) => setName(e.target.value)} autoFocus onBlur={(e) => {
                    e.target.parentElement.style.display='none'
                    e.target.parentElement.previousElementSibling.style.display="block"
                }} />
            </form>
        </div>
    )
}

export default AddList