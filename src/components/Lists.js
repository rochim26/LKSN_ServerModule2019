import React, {useContext, useState} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Axios from 'axios'
import Card from './Card'
import AddCard from './AddCard'
import { BoardContext } from '../contexts/BoardContext'

const Lists = ({list, boardId}) => {
    const {token} = useContext(AuthContext),
          {changeStateOfList, setChangeStateOfList, listTemp, setListTemp} = useContext(BoardContext),
        [name, setName] = useState('')

    const handleSubmit = () => {
        if(name){
            Axios.put(`http://localhost:8000/v1/board/${boardId}/list/${list.id}?token=${token}`, {
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
        } else {
            if(window.confirm('Are you sure want to delete this list?')){
                Axios.delete(`http://localhost:8000/v1/board/${boardId}/list/${list.id}?token=${token}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(res => {
                    alert(res.data.message)
                })
                .catch(err => alert(err.response.data.message))
            } else {
                return
            }
        }
    },
    moveLeft = () => {
        Axios.post(`http://localhost:8000/v1/board/${boardId}/list/${list.id}/left?token=${token}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message))
    },
    moveRight = () => {
        Axios.post(`http://localhost:8000/v1/board/${boardId}/list/${list.id}/right?token=${token}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => alert(res.data.message))
        .catch(err => alert(err.response.data.message))
    },
    changeCardToAnotherList = () => {
        Axios.post(`http://localhost:8000/v1/card/${listTemp}/move/${list.id}?token=${token}`, {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            alert(res.data.message)
        })
        .catch(err => alert(err.response.data.message))
    }
    return(
        <div className="list">
            <header onClick={(e) => {
                if(changeStateOfList === true) {
                    changeCardToAnotherList()
                    setChangeStateOfList(false)
                } else {
                    e.target.style.display="none"
                    e.target.nextElementSibling.style.display="block"
                    setName(list.name)
                    setListTemp('')
                }
            }}>{list.name} {changeStateOfList === true ? '(click here to move card)' : null}</header>
            <form style={{display: 'none'}} onSubmit={(e) => {
                e.preventDefault()
                e.target.style.display="none"
                e.target.previousElementSibling.style.display="block"
                handleSubmit()
            }}>
                <input value={name} placeholder="Are you sure want to delete?" onChange={(e) => setName(e.target.value)} onBlur={(e) => {
                    e.target.parentElement.style.display="none"
                    e.target.parentElement.previousElementSibling.style.display="block"
                    setName('')
                }} />
            </form>
            <div className="cards">
                {list.cards.length ? list.cards.map(card => {
                    return(
                        <Card key={card.card_id} card={card} listId={list.id} boardId={boardId} />
                    )
                }) : null}
            </div>
            <AddCard boardId={boardId} listId={list.id} />
            <div className="control">
                <span onClick={moveLeft}>&larr;</span>
                <span onClick={moveRight}>&rarr;</span>
            </div>
        </div>
    )
}

export default Lists