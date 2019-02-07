const express = require('express')

const app = express();


app.get('*', (req,res)=>{
    res.send('runnin in 3000')
})

app.listen(3000,()=>{
    console.log('runnnind in 3000')
})