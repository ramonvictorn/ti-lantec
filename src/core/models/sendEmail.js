const nodemailer = require('nodemailer');
module.exports = sendEmail;
const sgMail = require('@sendgrid/mail');
const SENDGRID_API_KEY= "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"
function sendEmail(context,cb){
  let ret = {}
  console.log('models send')
    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: false,
    //     // requireTLS: true,
    //     auth: {
    //         user: 'ti.lantec@gmail.com',
    //         pass: 'tilantec2019'
    //     }
    //   });

    // const mailOptions = {
    //     from: '<Pedro@pedro.com>',
    //     to: 'ramon.lantec@gmail.com',
    //     subject: 'E-mail enviado usando Node2!',
    //     text: 'Bem fácil, não? ;)'
    //   };

    //   transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log('erro aqui' ,error);
    //     } else {
    //       console.log('Email enviado: ' + info.response);
    //     }
    //   });

    sgMail.setApiKey(SENDGRID_API_KEY);
    const msg = {
      to: ['ti.lantec@gmail.com'],
      from: `${context.name} <${context.email}>`,
      subject: context.subject,
      text: context.solicitacao,
      html: `<strong>${context.bodyEmail}</strong>`,
    };
    // sgMail.send(msg);
    sgMail
  .send(msg, (error, result) => {
    if (error) {
      console.log('Erro on send Email',error);
      ret.err = {
        code : 400,
        text: 'FAIL_ON_SEND_EMAIL'
      }
    }
    else {
      console.log('sucess on send email')
      ret.data = {
        code:200,
        text:'EMAIL_SENDET'
      }
    }
    cb(ret)
  });
    console.log('sending')
}
