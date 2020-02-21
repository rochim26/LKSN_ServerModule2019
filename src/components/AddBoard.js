import React, {useContext, useState} from 'react'
import { BoardContext } from '../contexts/BoardContext'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'

const AddBoard = () => {
    const {token} = useContext(AuthContext),
          {getAllBoards} = useContext(BoardContext),
          [name, setName] = useState('')

    const handleSubmit = () => {
        Axios.post(`http://localhost:8000/v1/board?token=${token}`, {
            name
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            alert(res.data.message)
            setName('')
            getAllBoards()
        })
        .catch(err => alert(err.response.data.message))
    }

    return(
        <div className="board-wrapper">
            <div className="board new-board" onClick={(e) => {
                e.target.style.display = 'none'
                e.target.nextElementSibling.style.display = 'block'
            }}>Create new board...</div>
            <form className="board new-board" onSubmit={(e) => {
                e.preventDefault()
                e.target.style.display = 'none'
                e.target.previousElementSibling.style.display = 'block'
                handleSubmit()
            }} style={{display: 'none'}}>
                <input type="text" placeholder="New board name" value={name} onChange={(e) => setName(e.target.value)} />
            </form>
        </div>
    )
}

export default AddBoard