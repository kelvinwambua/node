const express = require('express')

const app = express()
const port = 4000

app.listen(port)

app.get('/',(res)=>{
  res.redirect('/home')
})
app.get('/home',(res)=>{
  res.sendFile('./views/home.html',{root:__dirname})
})
app.get('/about',(res)=>{
  res.sendFile('./views/about.html',{root:__dirname})
})
app.use((req, res, next) => {
  setTimeout(res.status().redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ'),25000)
});
