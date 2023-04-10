import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const usuarios = []
const tweets = [];


app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (!username || !avatar || (typeof username || typeof avatar) !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  const novoUsuario = {
    username,
    avatar,
  };

  usuarios.push(novoUsuario);
  res.send("OK");
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;
  const usuariosCadastrados = [];
  let imgUsuario;

  if (!user || !tweet || (typeof user || typeof tweet) !== "string") {
    return res.status(400).send("Todos os campos são obrigatórios!");
  }

  for (let i = 0; i < usuarios.length; i++) {
    usuariosCadastrados.push(usuarios[i].username);

    if (usuarios[i].username === user) {
      imgUsuario = usuarios[i].avatar;
    }
  }

  if (!usuariosCadastrados.includes(user)) {
    res.sendStatus(401);
    return;
  }

  const novoTweet = {
    avatar: imgUsuario,
    username: user,
    tweet,
  };

  tweets.push(novoTweet);
  res.status(201).send("OK");
});

app.get("/tweets", (req, res) => {
  const ultimosTweets = [];
  const page = req.query.page;

  if (!page) {
    for (let i = 0; i < 10; i++) {
      if (tweets[i]) {
        ultimosTweets.push(tweets[i]);
      }
    }
  } else if (page < 1) {
    return res.status(400).send("Informe uma página válida!");
  } else {
    for (let i = (page - 1) * 10; i < page * 10; i++) {
      if (tweets[i]) {
        ultimosTweets.push(tweets[i]);
      }
    }
  }

  res.send(ultimosTweets.reverse());
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;

  res.send(tweets.filter((tweet) => tweet.username === username).reverse());
});

app.listen(5000)