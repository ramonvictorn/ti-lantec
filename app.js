const express = require('express')

const app = express();


app.get('*', (req,res)=>{
    res.send('runnin in 30001')
})

app.listen(3001,()=>{
    console.log('runnnind in 3001')
})