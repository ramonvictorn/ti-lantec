const express = require('express')

const app = express()



app.get('*',(req,res)=>{
    res.send('system function on post 3002')
})

app.listen(3002,()=>{console.log('Listen on 3002')})
