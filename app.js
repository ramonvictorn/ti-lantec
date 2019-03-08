const express = require('express')

const app = express()

app.use('/js', express.static(__dirname + '/src/web/js/'));
// app.use('/js', express.static(__dirname + 'src/web/js'));
app.use('/css', express.static(__dirname + '/src/web/css/'));
// app.get('*',(req,res)=>{
//     res.send('system function on post 3002')
// })
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/src/web/index.html')
})
app.listen(3005,()=>{console.log('Listen on 3005')})
