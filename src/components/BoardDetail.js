import React, {useContext, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { BoardContext } from '../contexts/BoardContext'
import AddMember from './AddMember'
import MemberList from './MemberList'
import AddList from './AddList'
import Lists from './Lists'

const BoardDetail = (props) => {
    const {token} = useContext(AuthContext),
          {board, members, lists, getSingleBoard} = useContext(BoardContext)

    useEffect(() => {
        if(!token) {
            props.history.push('/login')
        }
    }, [token])

    useEffect(() => {
        getSingleBoard(props.match.params.board)
    }, [board])

    return(
        <div className="container" style={{display: 'block'}}>
            <div className="team-container">
                <div className="board-name">{board.name}</div>
                {members.length ? members.map(member => {
                    return (
                        <MemberList key={member.id} memberInitial={member.initial} memberTitle={`${member.first_name} ${member.last_name}`} memberId={member.member_id} boardId={props.match.params.board} />
                    )
                }) : null}
                <AddMember boardId={props.match.params.board} />
            </div>
            <div className="card-container">
                <div className="content">
                    {lists.length ? lists.map(list => {
                        return (
                            <Lists key={list.id} list={list} boardId={props.match.params.board} />
                        )
                    }) : null}
                    <AddList boardId={props.match.params.board} />
                </div>
            </div>
        </div>
    )
}

export default BoardDetail