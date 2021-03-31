const bcrypt = require ('bcrypt');
const express = require ('express');
const router = express.Router();
const Post = require("../models/post");

router.get('/', async (req,res) =>{
  const posts = await Post.find({});
  res.json(posts);
})

router.post('/', async (req, res)=>{
  await Post.findOne({username: req.body.username, email: req.body.email, comment: req.body.comment})
  .then(doc_post =>{
    if(doc_post){
      res.status(400).json({msg: "Já existe um comentário com este email e nome de usuário"});
    }else{
      const newPost = Post ({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        comment: req.body.comment,
      });

      //criptografia de senha e save do documento banco de dados
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(newPost.password, salt, function(err, hash){
          if (err) throw err;
          newPost.password = hash;
          newPost
          .save()
          .then(newPost => res.json(newPost)) //retorna informações do registro salvo no banco
          .catch(err => res.status(400).json(err)); //caso ocorra algum erro, retorna como um json
        });
      })
    }
  })
  .catch((err)=>{
    console.log(`Ocorreu um erro: ${err}`);
  })
})

module.exports = router;