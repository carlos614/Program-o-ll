var config = {
    apiKey: "AIzaSyAOl_ykbjIskTI9RhY3dFkqAbd2_LOJ_dU",
    authDomain: "veiculocrud-5b6e1.firebaseapp.com",
    databaseURL: "https://veiculocrud-5b6e1.firebaseio.com",
    projectId: "veiculocrud-5b6e1",
    storageBucket: "veiculocrud-5b6e1.appspot.com",
    messagingSenderId: "86297231061"
  };
  firebase.initializeApp(config);

  var dbRef = firebase.database();


  var fornecedorRef = dbRef.ref('fornecedor');
  var tabelaFornecedor = '';
  var theFornecedor = '';

  //Atualizar dados

  fornecedorRef.on("value", getFornecedorList);

function getFornecedorList(snap) {
    var data = [];

    snap.forEach(fornecedor => {
        var k = fornecedor.key;

        data.push({
            key: fornecedor.key,
            codigo: fornecedor.val().codigo,
            razaosocial: fornecedor.val().razaosocial,
            nomefantasia: fornecedor.val().nomefantasia,
            endereço: fornecedor.val().endereço
        });
    });

    $("#tabela").DataTable().clear().destroy();
    tabelaFornecedor = $("#tabela").DataTable({
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
            { data: "codigo" },
            { data: "razaosocial" },
            { data: "nomefantasia" },
            { data: "endereço" },
            {
                //"targets": -1,
                data: null,
                defaultContent: "<button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#editModal'><i class='material-icons md-18'>edit</i></button><button type='button' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#deleteModal'><i class='material-icons md-18'>delete</i></button>"
            }
        ]
    });

    $('#tabela tbody').on('click', 'button', function () {
        theFornecedor = tabelaFornecedor.row($(this).parents('tr')).data();
        console.log(theFornecedor);
        $("#edit_fornecedor_key").val(theFornecedor.key);
        $("#edit_fornecedor_codigo").val(theFornecedor.codigo);
        $("#edit_fornecedor_razaosocial").val(theFornecedor.razaosocial);
        $("#edit_fornecedor_nomefantasia").val(theFornecedor.nomefantasia);
        $("#edit_fornecedor_endereço").val(theFornecedor.endereço);

        $("#delete_fornecedor_key").val(theFornecedor.key);
        $("#mensagemExclusao").html("Confirmar a exclusão do Veículo: <b>" + theFornecedor.codigo + "</b>?");

    });
}

// -------------------------------------------------------------------------------------
// Passo 04 - Méotodos relacionados a botões e eventos
$(document).ready(function () {

    // Método para salvar novo Estudante
    $("#btnNewFornecedor").on("click", function (event) {
        event.preventDefault();
        if ($('#new_fornecedor_codigo').val() != '' || $('#new_fornecedor_nomefantasia').val() != '') {
            fornecedorRef.push({
                codigo: $('#new_fornecedor_codigo').val(),
                razaosocial: $('#new_fornecedor_razaosocial').val(),
                nomefantasia: $('#new_fornecedor_nomefantasia').val(),
                endereço: $('#new_fornecedor_endereço').val()
            
            })
            fornecedorForm.reset();
        } else {
            alert('Preencha os campos Código e Nome fantasia');
        }
    });

    //Método para Editar Fornecedor

    $("#btnEditFornecedor").on("click", function (event) {
        event.preventDefault();

        if ($('#edit_fornecedor_key').val() != '' && $('#edit_fornecedor_codigo').val() != '' && $('#edit_fornecedor_nomefantasia').val() != '') {
            console.log("Editar: " + $("#edit_fornecedor_key").val());

            fornecedorRef.child($("#edit_fornecedor_key").val()).update({
                codigo: $('#edit_fornecedor_codigo').val(),
                razaosocial: $('#edit_fornecedor_razaosocial').val(),
                nomefantasia: $('#edit_fornecedor_nomefantasia').val(),
                endereço: $('#edit_fornecedor_endereço').val()
            });
        }else {
            alert('Preencha os campos Código e Nome fantasia');
        }
    });

    //Método para Excluir Estudante

    $("#btnDeleteFornecedor").on("click", function (event) {
        event.preventDefault();
        if ($('#delete_fornecedor_key').val() != '') {
            console.log("Excluir: " + $("#delete_fornecedor_key").val());

            fornecedorRef.child($("#delete_fornecedor_key").val()).remove();
        }
    });
});