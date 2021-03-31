const express = require("express");
const cors = require("cors");
const app = express();

//---------------banco de dados----------------
const mongoose = require('mongoose');
const db_access = require('./setup/bd').mongoURL;

mongoose
.connect(db_access, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Conexão ao MongoDB bem sucedida!"))
.catch(err => console.log(err));
//---------------------------------------------

app.use(cors());

//express resources
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//import routes
const post = require("./routes/post");


app.use("/post", post);

app.get("/", (req, res)=> {
  res.send("Hello World!");
});

app.use('*', (req, res)=>{
  res.status(404).send("Requisição inválida");
})

const port = 3001;

app.listen(port, () => console.log(`Executando na porta ${port}.`));