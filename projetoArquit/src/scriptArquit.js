var config = {

  };
  firebase.initializeApp(config);

  var dbRef = firebase.database();
  var parkingRef = dbRef.ref('parking');


  parkingRef.on("value", getData, errData);

  function getData(snap){
      var data = [];

      snap.forEach(parking => {
        var k = parking.key;

        data.push({
            placa : parking.val().placa,
            marca : parking.val().marca,
            modelo : parking.val().modelo,
            cor : parking.val().cor
        });
      });

      $('#tabela').DataTable().clear().destroy();
      $("#tabela").DataTable({
          "data": data,
          columns: [
              { data: "placa" },
              { data: "marca" },
              { data: "modelo" },
              { data: "cor" }
          ]
      });
  }

  function errData(err){
      console.log(err);
  }


  $('.addValue').on("click", function (event){
      event.preventDefault();
      if($('#parking_placa').val() != '' || $('parking_modelo').val() !=''){
          parkingRef.push({
              placa: $('#parking_placa').val(),
              marca: $('#parking_marca').val(),
              modelo: $('#parking_modelo').val(),
              cor: $('#parking_cor').val()
          })
          parkingForm.reset();
      }else {
          alert('Preencha os campos Placa e Modelo do carro')
      }
  });