import React from 'react'
import './components.css';

export default function PostArea(props) {
  return (
    <div className="comment">
    <div className="headerComment">
      <span>{props.post.username}</span>
    </div>  
    <div className="contentComment">
      <p>{props.post.comment}</p> 
    </div>          
  </div>
  )
}
