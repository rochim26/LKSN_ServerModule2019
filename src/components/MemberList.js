import React, {useContext} from 'react'
import Axios from 'axios'
import { AuthContext } from '../contexts/AuthContext'

const BoardDetail = ({memberInitial, memberTitle, boardId, memberId}) => {
    const {token} = useContext(AuthContext)

    const handleClick = () => {
        if(window.confirm('Are you sure want to remove this member?')) {
            console.log(memberId)
            Axios.delete(`http://localhost:8000/v1/board/${boardId}/member/${memberId}?token=${token}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => alert(res.data.message))
            .catch(err => alert(err.response.data.message))
        } else {
            return
        }
    }
    return(
        <div className="member" title={memberTitle} onClick={handleClick}>{memberInitial}</div>
    )
}

export default BoardDetail