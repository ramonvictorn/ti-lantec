const express = require('express')

const app = express()



app.get('*',(req,res)=>{
    res.send('system function on post 3006')
})

app.listen(3006,()=>{console.log('Listen on 3006')})
