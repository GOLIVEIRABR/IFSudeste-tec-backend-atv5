import React, { useState, useEffect } from 'react';
import PostArea from './components/PostArea';
import PostForm from './components/PostForm';
import Api from '../../Api';
import './index.css';

export default function Index() {

  const [posts, setPosts] = useState([]); 
  const [submiting, setSubmiting] = useState(false);   
  const [loading, setLoading] = useState(true);
  const [submitErrors, setSubmitErrors] = useState("")
  //carga inicial dos dados
  useEffect(() => {
    (async () =>{
      setLoading(true);
      const response = await Api.get('/post');
      setPosts(response.data);
      setLoading(false);
    })();
  },[])

  //manipulação do submit do form
  const handleSavePost = async (event) =>{
    setSubmiting(true);
    setSubmitErrors("");
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const comment = formData.get("comment");
    const newPost = {username, email, password, comment};    
    try {
      await Api.post('/post', newPost);
      setPosts([...posts, newPost]);
      setSubmiting(false);   
    } catch (error) {
        if(error.response.data.name === "ValidationError"){
          setSubmitErrors("Ocorreram erros de validação. Todo os campos são obrigatórios!");
        }else{
          setSubmitErrors("Comentários repetidos não podem ser salvos!");
        }
      setSubmiting(false);   
    }
  }

  return (
    <div className="bodyPost">
    <h1>Área de Comentários</h1>
    {
      loading===true?<h2>Buscando comentários...</h2>:      
        posts.map((post, index) => {
        return <PostArea post={post} key={index}/>
      })
    } 
    {
      submitErrors?<h5>{submitErrors}</h5>:""
    }
    {   
      submiting===true?<h2>Enviando comentário...</h2>:<PostForm handleSavePost={handleSavePost}></PostForm> 
    }       
    </div>
  )
}
