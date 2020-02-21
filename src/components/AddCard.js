import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const AddCard = ({boardId, listId}) => {
    const {token} = useContext(AuthContext),
          [task, setTask] = useState('')

    const handleSubmit = (e) => {
        Axios.post(`http://localhost:8000/v1/board/${boardId}/list/${listId}/card?token=${token}`, {
            task
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            alert(res.data.message)
            setTask('')
        })
        .catch(err => alert(err.response.data.message))
    }
    
    return(
        <div>
            <div className="button" onClick={(e) => {
                e.target.style.display='none'
                e.target.nextElementSibling.style.display='block'
            }}>+ Add new card</div>
            <form className="button" onSubmit={(e) => {
                e.preventDefault()
                e.target.style.display='none'
                e.target.previousElementSibling.style.display='block'
                handleSubmit()
            }} style={{display: 'none'}}>
                <input type="text" value={task} onChange={(e) => setTask(e.target.value)} onBlur={(e) => {
                    e.target.parentElement.style.display='none'
                    e.target.parentElement.previousElementSibling.style.display='block'
                }} />
            </form>
        </div>
    )
}

export default AddCard