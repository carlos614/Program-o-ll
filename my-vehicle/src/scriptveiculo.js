
  // Initialize Firebase
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


var vehicleRef = dbRef.ref('vehicle');
var tabelaVehicle = '';
var theVehicle = '';

// -------------------------------------------------------------------------------------
// Passo 03 - Sempre que houver uma atualização de dados, atualizar dados
vehicleRef.on("value", getVehicleList);

function getVehicleList(snap) {
    var data = [];

    snap.forEach(vehicle => {
        var k = vehicle.key;

        data.push({
            key: vehicle.key,
            renavam: vehicle.val().renavam,
            marca: vehicle.val().marca,
            modelo: vehicle.val().modelo,
            ano: vehicle.val().ano,
            placa: vehicle.val().placa
        });
    });

    $("#tabela").DataTable().clear().destroy();
    tabelaVehicle = $("#tabela").DataTable({
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
            { data: "renavam" },
            { data: "marca" },
            { data: "modelo" },
            { data: "ano" },
            { data: "placa" },
            {
                //"targets": -1,
                data: null,
                defaultContent: "<button type='button' class='btn btn-primary btn-sm' data-toggle='modal' data-target='#editModal'><i class='material-icons md-18'>edit</i></button><button type='button' class='btn btn-danger btn-sm' data-toggle='modal' data-target='#deleteModal'><i class='material-icons md-18'>delete</i></button>"
            }
        ]
    });

    $('#tabela tbody').on('click', 'button', function () {
        theVehicle = tabelaVehicle.row($(this).parents('tr')).data();
        console.log(theVehicle);
        $("#edit_vehicle_key").val(theVehicle.key);
        $("#edit_vehicle_renavam").val(theVehicle.renavam);
        $("#edit_vehicle_marca").val(theVehicle.marca);
        $("#edit_vehicle_modelo").val(theVehicle.modelo);
        $("#edit_vehicle_ano").val(theVehicle.ano);
        $("#edit_vehicle_placa").val(theVehicle.placa);

        $("#delete_vehicle_key").val(theVehicle.key);
        $("#mensagemExclusao").html("Confirmar a exclusão do Veículo: <b>" + theVehicle.renavam + " - " + theVehicle.modelo + "</b>?");

    });
}

// -------------------------------------------------------------------------------------
// Passo 04 - Méotodos relacionados a botões e eventos
$(document).ready(function () {

    // Método para salvar novo Estudante
    $("#btnNewVehicle").on("click", function (event) {
        event.preventDefault();
        if ($('#new_vehicle_renavam').val() != '' || $('#new_vehicle_modelo').val() != '') {
            vehicleRef.push({
                renavam: $('#new_vehicle_renavam').val(),
                marca: $('#new_vehicle_marca').val(),
                modelo: $('#new_vehicle_modelo').val(),
                ano: $('#new_vehicle_ano').val(),
                placa: $('#new_vehicle_placa').val()
            })
            vehicleForm.reset();
        } else {
            alert('Preencha os campos Renavam e Marca');
        }
    });

    // [IMPLEMENTAR] Método para Editar Veiculo
    $("#btnEditVehicle").on("click", function (event) {
        event.preventDefault();

        if ($('#edit_vehicle_key').val() != '' && $('#edit_vehicle_renavam').val() != '' && $('#edit_vehicle_modelo').val() != '') {
            console.log("Editar: " + $("#edit_vehicle_key").val());

            vehicleRef.child($("#edit_vehicle_key").val()).update({
                renavam: $('#edit_vehicle_renavam').val(),
                marca: $('#edit_vehicle_marca').val(),
                modelo: $('#edit_vehicle_modelo').val(),
                ano: $('#edit_vehicle_ano').val(),
                placa: $('#edit_vehicle_placa').val()
            });
        }else {
            alert('Preencha os campos Renavam e Modelo');
        }
    });

    // [IMPLEMENTAR] Método para Excluir Estudante
    $("#btnDeleteVehicle").on("click", function (event) {
        event.preventDefault();
        if ($('#delete_vehicle_key').val() != '') {
            console.log("Excluir: " + $("#delete_vehicle_key").val());

            vehicleRef.child($("#delete_vehicle_key").val()).remove();
        }
    });
});