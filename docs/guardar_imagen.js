Webcam.set({
  width: 350,
  height: 287,
  image_format: 'jpeg',
  jpeg_quality: 90
});
Webcam.attach('#my_camera');

function capturarImagen() {
  Webcam.snap(function (data_uri) {
    document.getElementById('results').innerHTML =
      '<img class="after_capture_frame" src="' + data_uri + '"/>';
    $("#captured_image_data").val(data_uri);
  });
}

function guardarImagen() {
  $.ajax({
    type: "POST",
    url: "eliminar_fichero.php",
    data: { fichero: "backend/output.csv" },
  });

  var base64data = $("#captured_image_data").val();
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "guardar_imagen.php",
    data: { image: base64data },
  });

  setTimeout(function () {
    $.ajax({
      type: "GET",
      url: "backend/output.csv",
      success: function (data) {
        mostrarResultados();
      },
    })
  }, 5000);
}

/*
function guardarImagen() {
  $.ajax({
    type: "POST",
    url: "eliminar_fichero.php",
    data: { fichero: "backend/output.csv" },
  });

  var base64data = $("#captured_image_data").val();
  $.ajax({
    type: "POST",
    dataType: "json",
    url: "guardar_imagen.php",
    data: { image: base64data },
  });

  $.ajax({
    type: "GET",
    url: "backend/output.csv",
    success: function (data) {
      mostrarResultados();
    },
    error: function (data) {
      setTimeout(function () {
        $.ajax({
          type: "GET",
          url: "backend/output.csv",
          success: function (data) {
            mostrarResultados();
          },
        })
      }, 5000);
    }
  });
}
*/