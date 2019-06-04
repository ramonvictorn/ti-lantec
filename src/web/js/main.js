var sala;

function teste(){
    var name = $('#name').val();
    var email = $('#email').val();
    var local = $('#local').val();local = $('#local').val();
    var solicitacao = $('#solicitacao').val();
    var subject = $('#subject').val();
    var mesa = $('#mesas').val();
    var context = {
        name,
        email,
        local,
        mesa,
        email,
        solicitacao,
        subject,
    }
    // console.log('verifyData(context) ->', verifyData(context))
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
  // console.log('sala aqui ', sala)
  if(context.solicitacao == "" || context.solicitacao == " " || context.solicitacao == null || context.solicitacao == undefined) return false;
  if(context.subject == "" || context.subject == " " || context.subject == null || context.subject == undefined) return false;
  if(context.local == null || context.local == "") return false;
  if(sala == 'Bloco A - 504 - lab' || sala == 'Bloco D - 201'){
    if(($('#mesas').val() == null))return false;
  }
  //  console.log('deu true então') 
  return true;
}


function cancel(){
    var name = $('#name').val('');
    var email = $('#email').val('');
    var local = $('#local').val();
    var solicitacao = $('#solicitacao').val('');
    var subject = $('#subject').val('');

}
// $('#mesas').hide()
// $('#mesasLabel').hide()
// selec evet
$('#mesasDiv').hide();
function changeOnSelect(value){
  // console.log('changeOnSelect', value.value)
  sala = value.value;
  var label = $("<label id='mesasLabel'>").text('Mesa:');
  var select = $("<select class='form-control' id='mesas'>");
  // reset
  $('#mesasDiv').hide();
  $('#mesas').remove();
  $('#mesasLabel').remove();
  
  if(value.value == 'Bloco A - 504 - lab'){
    // console.log('sala 504, 32 mesas')
    $('#mesasDiv').append(label);
    $('#mesasDiv').append(select);
    for(var cont = 1; cont <= 32; cont++){{
      $('#mesas').append(new Option(`${cont}`, `${cont}`));
    }
  }
  $('#mesasDiv').show()
  }
  if(value.value == 'Bloco D - 201'){
    // console.log('sala 201, 18 mesas')
      $('#mesasDiv').append(label);
      $('#mesasDiv').append(select);
      for(var cont = 1; cont <= 18; cont++){
        $('#mesas').append(new Option(`${cont}`, `${cont}`));    
      }
      $('#mesasDiv').show()
  }
}