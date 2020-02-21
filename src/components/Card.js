import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'
import { BoardContext } from '../contexts/BoardContext'

const Cards = ({card, listId, boardId}) => {
    const {token} = useContext(AuthContext),
          {setChangeStateOfList, setListTemp} = useContext(BoardContext),
          [task, setTask]= useState('')
    
    const moveDown = () => {
        Axios.post(`http://localhost:8000/v1/card/${card.card_id}/down?token=${token}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message))
    },
    moveUp = () => {
        Axios.post(`http://localhost:8000/v1/card/${card.card_id}/up?token=${token}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message))
    },
    handleSubmit = () => {
        if(task) {
            Axios.put(`http://localhost:8000/v1/board/${boardId}/list/${listId}/card/${card.card_id}?token=${token}`, {
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
            .catch(err => {
                alert(err.response.data.message)
            })
        } else {
            if(window.confirm('Are you sure want to delete this card?')){
                Axios.delete(`http://localhost:8000/v1/board/${boardId}/list/${listId}/card/${card.card_id}?token=${token}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    alert(res.data.message)
                    setTask('')
                })
                .catch(err => {
                    alert(err.response.data.message)
                })
            } else {
                return
            }
        }
    }
    return(
        <div className="card">
            <div className="card-content" onClick={(e) => {
                e.target.style.display="none"
                e.target.nextElementSibling.style.display="block"
                setChangeStateOfList(true)
                setListTemp(card.card_id)
                setTask(card.task)
            }}>
                {card.task}
            </div>
            <form className="card-content" style={{display: 'none'}} onSubmit={(e) => {
                e.preventDefault()
                e.target.style.display="none"
                e.target.previousElementSibling.style.display="block"
                handleSubmit()
            }}>
                <input placeholder="Are you sure want to delete this card?" type="text" value={task} onChange={(e) => setTask(e.target.value)} onBlur={(e) => {
                    e.target.parentElement.style.display="none"
                    e.target.parentElement.previousElementSibling.style.display="block"
                    setTask('')
                }} />
            </form>
            <div className="control">
                <span onClick={moveUp}>&uarr;</span>
                <span onClick={moveDown}>&darr;</span>
            </div>
        </div>
    )
}

export default Cards