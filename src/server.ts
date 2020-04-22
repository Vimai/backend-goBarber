import express from 'express';

const app = express()
app.get('/', (resquest, response) => {
    return response.json({message: 'ok server'})
})

app.listen(3333, ()=> {
    console.log('🔝 Server Started on port 3333')
})