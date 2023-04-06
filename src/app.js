import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const usuarios = []
const tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  const novoUsuario = {
    username,
    avatar,
  };

  usuarios.push(novoUsuario);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const usuariosCadastrados = [];
  let imgUsuario;

  for (let i = 0; i < usuarios.length; i++) {
    usuariosCadastrados.push(usuarios[i].username);

    if (usuarios[i].username === username) {
      imgUsuario = usuarios[i].avatar;
    }
  }

  if (!usuariosCadastrados.includes(username)) {
    res.send("UNAUTHORIZED");
    return;
  }

  const novoTweet = {
    avatar: imgUsuario,
    username,
    tweet,
  };

  tweets.push(novoTweet);
  res.send("OK");
});

app.get('/tweets', (req, res) => {
    const ultimosTweets = []

    for(let i = 0; i < 10; i++){
        if(tweets[i]){
        ultimosTweets.push(tweets[i])
    }
}

    res.send(ultimosTweets)
})

app.listen(5000)