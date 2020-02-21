import React, {createContext, useState, useContext} from 'react'
import Axios from 'axios'
import { AuthContext } from './AuthContext'

export const BoardContext = createContext()

const BoardContextProvider = (props) => {
    const {token} = useContext(AuthContext)
    const [boards, setBoards] = useState([])
    const [board, setBoard] = useState('')
    const [members, setMembers] = useState('')
    const [lists, setLists] = useState('')
    const [changeStateOfList, setChangeStateOfList] = useState(false)
    const [listTemp, setListTemp] = useState('')
    const getAllBoards = () => {
        return Axios.get(`http://localhost:8000/v1/board?token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setBoards(res.data)
        })
    }

    const getSingleBoard = (params) => {
        return Axios.get(`http://localhost:8000/v1/board/${params}?token=${token}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            setBoard(res.data.data)
            setMembers(res.data.data.members)
            setLists(res.data.data.lists)
        })
    }

    return(
        <BoardContext.Provider value={{boards, getAllBoards, board, getSingleBoard, members, lists, changeStateOfList, setChangeStateOfList, listTemp, setListTemp}}>
            {props.children}
        </BoardContext.Provider>
    )
}

export default BoardContextProvider