const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

server.use(express.static('public'))

nunjucks.configure('src/views',{
    express:server,
    noCache: true,
})

server.get('/', (request, response)=>{
    return response.render('index.html',{ title: 'Um titulo'})
})

server.get('/create-point',(request, response)=>{
    return response.render('create-point.html')
})

server.get('/search',(request, response)=>{
    return response.render('search-results.html')
})

server.emit(console.log('Servidor ligado'))

server.listen(3000)