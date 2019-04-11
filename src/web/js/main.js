function teste(){
    var name = $('#name').val();
    var email = $('#email').val();
    var local = $('#local').val();
    var solicitacao = $('#solicitacao').val();
    var subject = $('#subject').val();
    var context = {
        name,
        email,
        local,
        email,
        solicitacao,
        subject,
    }
    console.log('verifyData(context) ->', verifyData(context))
    if(isEmail(context.email) && verifyData(context)){
        $.ajax({
            method: "POST",
            url: "/sendEmail",
            data: context,
            beforeSend: function() {
              // alert('Enviando solicitação...')
              $('#solicitar').attr("disabled", true);

            },
            complete: function(returned) {
              // console.log('returnet ', returned)
              if(returned.status == 400){
                alert('Ocorreu um erro, por favor envie um email para ti.lantec@gmail.com informando sua solicitação')
              }else{
                alert('Solicitação enviada com sucesso, verifique seu email para confirmar.')
                cancel()
              }
          },
          })
    }else{
      alert('Insira os dados corretamente!')
    }
    
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  // console.log('isEmail - > ',regex.test(email))
  return regex.test(email);
}

function verifyData(context){
  if(context.solicitacao == "" || context.solicitacao == " " || context.solicitacao == null || context.solicitacao == undefined) return false;
  if(context.subject == "" || context.subject == " " || context.subject == null || context.subject == undefined) return false;
  return true;
}


function cancel(){
    var name = $('#name').val('');
    var email = $('#email').val('');
    var local = $('#local').val();
    var solicitacao = $('#solicitacao').val('');
    var subject = $('#subject').val('');

}