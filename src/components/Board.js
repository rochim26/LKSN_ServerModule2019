import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { BoardContext } from '../contexts/BoardContext'
import {Link} from 'react-router-dom'
import Axios from 'axios'

const Board = ({boardName, boardId}) => {
    const {token} = useContext(AuthContext),
          {getAllBoards} = useContext(BoardContext),
          [name, setName] = useState('')

    const handleClick = (con) => {
        if(con) {
            setName(boardName)

        } else {
            setName('')
        }
    }

    const handleSubmit = () => {
        if(name) {
            Axios.put(`http://localhost:8000/v1/board/${boardId}?token=${token}`, {
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
        } else {
            if(window.confirm('Are you sure want to delete?')) {
                Axios.delete(`http://localhost:8000/v1/board/${boardId}?token=${token}`, {
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
            } else {
                return
            }
        }
    }

    return(
        <div className="board-wrapper">
            <div className="board"><span onClick={(e) => {
                e.target.parentElement.style.display = 'none'
                e.target.parentElement.nextElementSibling.style.display = 'block'
                handleClick(true)
            }}>{boardName}</span> <Link to={`/${boardId}`} title="Detail">(i)</Link></div>
            <form className="board" onSubmit={(e) => {
                e.preventDefault()
                e.target.style.display = 'none'
                e.target.previousElementSibling.style.display = 'block'
                handleSubmit()
            }} style={{display: 'none'}}>
                <input type="text" placeholder="Are you sure want to delete?" value={name} onChange={(e) => setName(e.target.value)} onBlur={(e) => {
                    e.target.parentElement.style.display = 'none'
                    e.target.parentElement.previousElementSibling.style.display = 'block'
                    handleClick(false)
                }
                } />
            </form>
        </div>
    )
}

export default Board