const express = require('express')

const app = express()

app.use('/js', express.static(__dirname + '/src/web/js/'));
// app.use('/js', express.static(__dirname + 'src/web/js'));
app.use('/css', express.static(__dirname + '/src/web/css/'));
// app.get('*',(req,res)=>{
//     res.send('system function on post 3002')
// })

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.get('/', (req,res)=>{
    res.sendFile(__dirname + '/src/web/noService.html')
})


const sendEmailController = require('./src/core/controllers/sendEmail.js')
app.post('/sendEmail', (req,res)=>{
    // console.log('send email aqui ', req.body)
    sendEmailController(req,res)
})


app.listen(3005,()=>{console.log('Listen on 3005')})
