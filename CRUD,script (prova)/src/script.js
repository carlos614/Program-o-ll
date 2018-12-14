// -------------------------------------------------------------------------------------
// Passo 01 - [IMPLEMENTAR] Inicializar o Firebase
var config = {
    apiKey: "AIzaSyC9iorx4msF58xMddg0HbBiWtYGOUPdlqo",
    authDomain: "programacaocrud.firebaseapp.com",
    databaseURL: "https://programacaocrud.firebaseio.com",
    projectId: "programacaocrud",
    storageBucket: "programacaocrud.appspot.com",
    messagingSenderId: "90141214222"
   
};
firebase.initializeApp(config);
// O passo 1 é o IP do servidor com o firebase com o computador.
// -------------------------------------------------------------------------------------
// Passo 02 - Criar variável de controle
var dbRef = firebase.database();

//Base de Estudantes
var studentsRef = dbRef.ref('students');
var tabelaStudent = '';
var theStudent = '';

//Base de Professores
var professorRef = dbRef.ref('professor');
var tabelaProfessor = '';
var theProfessor = '';

// -------------------------------------------------------------------------------------
// Passo 03 - Sempre que houver uma atualização de dados, atualizar dados
studentsRef.on("value", getStudentsList, errData);

function getStudentsList(snap) {
    var data = [];

    snap.forEach(student => {
        var k = student.key;

        data.push({
            key: student.key,
            ra: student.val().ra,
            nome: student.val().nome,
            email: student.val().email,
            cpf: student.val().cpf
        });
    });

    $("#tabela").DataTable().clear().destroy();
    tabelaStudent = $("#tabela").DataTable({
        "data": data,
        language: {
            "sEmptyTable": "Nenhum registro encontrado",
            "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
            "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
            "sInfoFiltered": "(Filtrados de _MAX_ registros)",
            "sInfoPostFix": "",
            "sInfoThousands": ".",
            "sLengthMenu": "_MENU_ resultados por página",
            "sLoadingRecords": "Carregando...",
            "sProcessing": "Processando...",
            "sZeroRecords": "Nenhum registro encontrado",
            "sSearch": "Pesquisar",
            "oPaginate": {
                "sNext": "Próximo",
                "sPrevious": "Anterior",
                "sFirst": "Primeiro",
                "sLast": "Último"
            },
            "oAria": {
                "sSortAscending": ": Ordenar colunas de forma ascendente",
                "sSortDescending": ": Ordenar colunas de forma descendente"
            }
        },
        columns: [
            { data: "ra" },
            { data: "nome" },
            { data: "email" },
            { data: "cpf" },
            {
                //"targets": -1,
                data: null,
                defaultContent: "<button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#editModal'><i class='material-icons md-18'>edit</i></button><button type='button' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#deleteModal'><i class='material-icons md-18'>delete</i></button>"
            }
        ]
    });

    $('#tabela tbody').on('click', 'button', function () {
        theStudent = tabelaStudent.row($(this).parents('tr')).data();
        console.log(theStudent);
        $("#edit_student_key").val(theStudent.key);
        $("#edit_student_ra").val(theStudent.ra);
        $("#edit_student_nome").val(theStudent.nome);
        $("#edit_student_email").val(theStudent.email);
        $("#edit_student_cpf").val(theStudent.cpf);

        $("#delete_student_key").val(theStudent.key);
        $("#mensagemExclusao").html("Confirmar a exclusão do Estudante: <b>" + theStudent.ra + " - " + theStudent.nome + "</b>?");

    });
}

professorRef.on("value", getProfessorList, errData);

// [IMPLEMENTAR] Método de listagem!!!!
function getProfessorList(snap) {
    var data = [];

    snap.forEach(professor => {
        var k = professor.key;

        data.push({
            key: professor.key,
            cpf: professor.val().cpf,
            nome: professor.val().nome,
            especializacao: professor.val().especializacao,
            codigo: professor.val().codigo
        });
    });    



$("#tabela").DataTable().clear().destroy();
tabelaProfessor = $("#tabela").DataTable({
    "data": data,
    language: {
        "sEmptyTable": "Nenhum registro encontrado",
        "sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
        "sInfoFiltered": "(Filtrados de _MAX_ registros)",
        "sInfoPostFix": "",
        "sInfoThousands": ".",
        "sLengthMenu": "_MENU_ resultados por página",
        "sLoadingRecords": "Carregando...",
        "sProcessing": "Processando...",
        "sZeroRecords": "Nenhum registro encontrado",
        "sSearch": "Pesquisar",
        "oPaginate": {
            "sNext": "Próximo",
            "sPrevious": "Anterior",
            "sFirst": "Primeiro",
            "sLast": "Último"
        },
        "oAria": {
            "sSortAscending": ": Ordenar colunas de forma ascendente",
            "sSortDescending": ": Ordenar colunas de forma descendente"
        }
    },
    columns: [
        { data: "cpf" },
        { data: "nome" },
        { data: "especializacao" },
        { data: "codigo" },
        {
            //"targets": -1,
            data: null,
            defaultContent: "<button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#editModal'><i class='material-icons md-18'>edit</i></button><button type='button' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#deleteModal'><i class='material-icons md-18'>delete</i></button>"
        }
    ]
});

$('#tabela tbody').on('click', 'button', function () {
    theProfessor = tabelaProfessor.row($(this).parents('tr')).data();
    console.log(theProfessor);
    $("#edit_professor_key").val(theProfessor.key);
    $("#edit_professor_cpf").val(theProfessor.cpf);
    $("#edit_professor_nome").val(theProfessor.nome);
    $("#edit_professor_especializacao").val(theProfessor.especializacao);
    $("#edit_professor_codigo").val(theProfessor.codigo);

    $("#delete_professor_key").val(theProfessor.key);
    $("#mensagemExclusao").html("Confirmar a exclusão do Professor: <b>" + theProfessor.cpf + " - " + theProfessor.nome + "</b>?");

    });

}

// -------------------------------------------------------------------------------------
// Passo 04 - Méotodos relacionados a botões e eventos
$(document).ready(function () {

    // Método para salvar novo Estudante
    $("#btnNewStudent").on("click", function (event) {
        event.preventDefault();
        if ($('#new_student_ra').val() != '' || $('#new_student_nome').val() != '') {
            studentsRef.push({
                ra: $('#new_student_ra').val(),
                nome: $('#new_student_nome').val(),
                email: $('#new_student_email').val(),
                cpf: $('#new_student_cpf').val()
            })
            studentForm.reset();
        } else {
            alert('Preencha os campos RA e Nome');
        }
    });

    // [IMPLEMENTAR] Método para Salvar novo Professor
    $("#btnNewProfessor").on("click", function (event) {
        event.preventDefault();
        if($('#new_professor_cpf').val() != '' || $('#new_professor_nome').val() != ''){
            professorRef.push({
                cpf: $('#new_professor_cpf').val(),
                nome: $('#new_professor_nome').val(),
                especializacao: $('#new_professor_especializacao').val(),
                codigo: $('#new_professor_codigo').val()
            })
            professorForm.reset();
        } else {
            alert('Preencha os campos Cpf e Nome');
        }

    });

     // [IMPLEMENTAR] Método para Editar Professor
    $("#btnEditProfessor").on("click", function (event) {
        event.preventDefault();

        if ($('#edit_professor_key').val() != '' && $('#edit_professor_cpf').val() != '' && $('#edit_professor_nome').val() != '') {
            console.log("Editar: " + $("#edit_professor_key").val());

            professorRef.child($("#edit_professor_key").val()).update({
                cpf: $('#edit_professor_cpf').val(),
                nome: $('#edit_professor_nome').val(),
                especializacao: $('#edit_professor_especializacao').val(),
                codigo: $('#edit_student_codigo').val()
            });
        }else {
            alert('Preencha os campos Cpf e Nome');
        }
    });


    // [IMPLEMENTAR] Método para Editar Estudante
    $("#btnEditStudent").on("click", function (event) {
        event.preventDefault();

        if ($('#edit_student_key').val() != '' && $('#edit_student_ra').val() != '' && $('#edit_student_nome').val() != '') {
            console.log("Editar: " + $("#edit_student_key").val());

            studentsRef.child($("#edit_student_key").val()).update({
                ra: $('#edit_student_ra').val(),
                nome: $('#edit_student_nome').val(),
                email: $('#edit_student_email').val(),
                cpf: $('#edit_student_cpf').val()
            });
        }else {
            alert('Preencha os campos RA e Nome');
        }
    });

    // [IMPLEMENTAR] Método para Excluir Professor
    $("#btnDeleteProfessor").on("click", function (event) {
        event.preventDefault();
        if ($('#delete_professor_key').val() != '') {
            console.log("Excluir: " + $("#delete_professor_key").val());

            studentsRef.child($("#delete_professor_key").val()).remove();
        }
    });

    // [IMPLEMENTAR] Método para Excluir Estudante
    $("#btnDeleteStudent").on("click", function (event) {
        event.preventDefault();
        if ($('#delete_student_key').val() != '') {
            console.log("Excluir: " + $("#delete_student_key").val());

            studentsRef.child($("#delete_student_key").val()).remove();
        }
    });
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