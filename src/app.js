import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const usuarios = []
const tweets = []
let img;

app.post('/sign-up', (req, res) => {
    const { username, avatar} = req.body

    const novoUsuario = {
        username,
        avatar
    }

    usuarios.push(novoUsuario)
    img = avatar
    res.send('OK')
})

app.post('/tweets', (req, res) => {
    const {username, tweet} = req.body

    const novoTweet = {
        avatar: img,
        username,
        tweet
    }

    tweets.push(novoTweet)
    res.send('OK')
})

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