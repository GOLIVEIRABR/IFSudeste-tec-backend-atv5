import React from 'react';
import './components.css';

export default function PostForm(props) {
  return (
    <div className="formStyle">
    <form method="post" onSubmit={props.handleSavePost}>
      <div className="inputGroup">
        <label htmlFor="username">Nome de Usuário:</label>
        <input name="username"type="text"/>
      </div>
      <div className="inputGroup">
        <label htmlFor="email">Email:</label>
        <input name="email"type="email"/>
      </div>
      <div className="inputGroup">
        <label htmlFor="password">Senha:</label>
        <input name="password"type="password"/>
      </div>
      <div className="inputGroup">
        <label htmlFor="comment">Comentário:</label>
        <textarea name="comment" id="comment" cols="30" rows="10"></textarea>
      </div>
      <button>Enviar</button>
    </form>
  </div>  
  )
}
