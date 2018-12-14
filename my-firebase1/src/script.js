// -------------------------------------------------------------------------------------
// Passo 01 - Inicializar o Firebase
var config = {
    apiKey: "AIzaSyACz-uXOY11Cq-LYU6ezFyQzYiOdDmb_QQ",
    authDomain: "excrud-dddde.firebaseapp.com",
    databaseURL: "https://excrud-dddde.firebaseio.com",
    projectId: "excrud-dddde",
    storageBucket: "excrud-dddde.appspot.com",
    messagingSenderId: "1084670098054"
  };
  firebase.initializeApp(config);

// -------------------------------------------------------------------------------------
// Passo 02 - Criar variável de controle
var dbRef = firebase.database();
var studentsRef = dbRef.ref('students');

// -------------------------------------------------------------------------------------
// Passo 03 - Sempre que houver uma atualização de dados, atualizar dados
studentsRef.on("value", getData, errData);

function getData(snap){
    var data = [];

    snap.forEach(student => {
        var k = student.key;
        
        data.push({
            ra : student.val().ra,
            nome : student.val().nome,
            email : student.val().email,
            cpf : student.val().cpf
        });
    });
    
    $('#tabela').DataTable().clear().destroy();
    $("#tabela").DataTable({
        "data": data,
        columns: [
            { data: "ra" },
            { data: "nome" },
            { data: "email" },
            { data: "cpf" }
        ]
     });
}

function errData(err){
    console.log(err);
}

// -------------------------------------------------------------------------------------
// Passo 04 - Méotodo para salvar novo Estudante
$('.addValue').on("click", function (event) {
    event.preventDefault();
    if ($('#student_ra').val() != '' || $('#student_nome').val() != '') {
        studentsRef.push({
            ra: $('#student_ra').val(),
            nome: $('#student_nome').val(),
            email: $('#student_email').val(),
            cpf: $('#student_cpf').val()
        })
        studentForm.reset();
    } else {
        alert('Preencha os campos RA e Nome');
    }
});

// -------------------------------------------------------------------------------------
// Não usar esse código agora, será uma referência para o uso de Combobox 
// Exemplo: lista de contatos do estudante
function contactHtmlFromObject(contact) {
    console.log(contact);
    var html = '';
    html += '<li class="list-group-item contact">';
    html += '<div>';
    html += '<p class="lead">' + contact.name + '</p>';
    html += '<p>' + contact.email + '</p>';
    html += '<p><small title="' + contact.location.zip + '">'
        + contact.location.city + ', '
        + contact.location.state + '</small></p>';
    html += '</div>';
    html += '</li>';
    return html;
}