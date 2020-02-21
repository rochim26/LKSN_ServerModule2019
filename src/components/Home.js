import React, {useContext, useEffect} from 'react'
import '../home.css'
import { AuthContext } from '../contexts/AuthContext'
import { BoardContext } from '../contexts/BoardContext'
import AddBoard from './AddBoard'
import Board from './Board'

const Home = (props) => {
    const {token} = useContext(AuthContext)
    const {boards, getAllBoards} = useContext(BoardContext)

    useEffect(() => {
        if(!token) {
            props.history.push('/login')
        }
    }, [token])

    useEffect(() => {
        getAllBoards()
    }, [boards])

    return(
        <div className="container">
            <div className="board-container">
                {boards.length ? boards.map(board => {
                    return (
                        <Board key={board.id} boardId={board.id} boardName={board.name} />
                    )
                }) : null}
                <AddBoard />
            </div>
        </div>
    )
}

export default Home