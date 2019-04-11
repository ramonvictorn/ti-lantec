const sendEmailModels = require('../models/sendEmail.js')

module.exports = sendEmail;
function sendEmail(req,res){
    if(!verifyParams(req.body)) return res.status(400).send({error:'PARAMS_INVALIDS'})
    let context = req.body;
    context.bodyEmail = `Sala: ${req.body.local} <br>
        Solicitação: ${req.body.solicitacao}`;

    sendEmailModels(context,(ret)=>{
        if(ret.err){
            res.status(ret.err.code).send({error: ret.err.text})
        }else{
            res.status(ret.data.code).send({data: ret.data.text})
        }
    })
}

// returns falte if not ok
function verifyParams(params){
    if(params.email == '' || params.email == undefined || params.email == null) return false; 
    if(params.name == '' || params.name == undefined || params.name == null) return false; 
    return true;
}