function vectorATabla(tableData) {
  var table = $('<table></table>');
  $(tableData).each(function (i, rowData) {
      var row = $('<tr></tr>');
      $(rowData).each(function (j, cellData) {
          row.append($('<td>'+cellData+'</td>'));
      });
      table.append(row);
  });
  return table;
}

function mostrarResultados() {
  $.ajax({
    type: "GET",
    url: "backend/output.csv",
    success: function (data) {
        $('body').append(vectorATabla(Papa.parse(data).data));
    }
  });
}
