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
    if(!isEmail(context.email)){
      // console.log('email invalido');
      openModal('Atenção', 'Por favor, preencha com um email gmail válido.');
      // invalid
      return;
    }
    if(!verifyData(context)){
      // console.log('data invalidos');
      openModal('Atenção', 'Por favor, preencha todos os campos para criar sua solicitação.');
      // invalid
      return;
    }
    loadingModalStart();
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
          // alert('Ocorreu um erro, por favor envie um email para ti.lantec@gmail.com informando sua solicitação');
          $( "#loadGif" ).remove();
          ModalAfterRequest('Ocorreu um erro...',"Envie um email diretamente para ti.lantec@gmail.com");
        }else{
          $( "#loadGif" ).remove();
          ModalAfterRequest('Solicitação criada',"Verifique se recebeu um email com a confirmação da criação.")
          // alert('Solicitação enviada com sucesso, verifique seu email para confirmar.')
          cancel()
        }
      },
    })
      
    
    
    
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  // console.log('isEmail - > ',regex.test(email))
  var regerGmail = /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/;
  return (regex.test(email) && regerGmail.test(email));
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

function loadingModalStart(){
  // console.log('loading modal start');
  var title = $('#modalTitle').text('Enviando solicitação...');
  var bodyModal = $('#modalBody').append('<img id="loadGif" src="http://arquivos.lantec.ufsc.br/Ti/assets/loadingSpinner.gif">');
  $('#modal').css('opacity',1);
  $('#modal').show();
}
function ModalAfterRequest(title,msgBody){
  // console.log('loading modal ModalAfterRequest');
  var title = $('#modalTitle').text(title);
  var bodyModal = $('#modalBody').append(`<h3>${msgBody}</h3>`);
}


function openModal(title,textBody){
  // console.log('open modal', title);
  var title = $('#modalTitle').text(title);
  var bodyModal = $('#modalBody').text(textBody);
  $('#modal').css('opacity',1);
  $('#modal').show()
};

function closeModal(){
  $('#modal').css('opacity',0);
  $('#modal').hide();
  var title = $('#modalTitle').text('');
  var bodyModal = $('#modalBody').text('');
  $('#loadGif').remove();
}

$(document).ready(function() {
  // console.log('doc ready');
  $(document).click(function(event) {
    // console.log("click vent",$(event.target).closest('#modal').length);
    if($(event.target).closest('#modal').length){
      closeModal();
    }
  });
});