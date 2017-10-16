  var states = [{
    "value": 0,
    "text": "EN BODEGA"
  }, {
    "value": 1,
    "text": "ENTREGADO"
  },
  {
    "value": 2,
    "text": "RESERVADO"
  }];
      function etiqueta(){
  
    var gridDataArray = $('#grid').data('kendoGrid')._data;
    

    w3.displayObject("Etiquetas", { etiquetas: gridDataArray });
  
    $("#manchego2").kendoBarcode({
      value: "CIN2017420010",
      type: "code128",
      width: 150,
      height: 50
      });
    $("#myModal2").modal()
  }

    

  kendo.culture("es-ES");
  $(document).ready(function () {
    dataSource = new kendo.data.DataSource({
      transport: {
        read: { url: "/product/read", dataType: "json" }
      },
      batch: true,
      pageSize: 10,
      serverFiltering: false,
      schema: {
        model: {
          id: "id",
          fields: {
            code: { type: "string" },
            date: { type: 'date', editable: false },
            state: { type: 'state', editable: false }
          }
        }
      },
     

      group: [ { field: "description", dir: "desc" }, { field: "state", aggregates: [{ field: "state", aggregate: "count" }
    ] } ],  
      aggregate: [
        { field: "code", aggregate: "count" },
        { field: "category", aggregate: "count" },
        { field: "state", aggregate: "count" }],
      pageSize: 1000
    }
    );

    $("#grid").kendoGrid({
      dataSource: dataSource,
      height: 600,
      toolbar: ['excel'],
      pdf: {
        allPages: true,
        avoidLinks: true,
        paperSize: "A4",
        margin: { top: "3.8cm", left: "1cm", right: "1cm", bottom: "2.54cm" },
        landscape: true,
        repeatHeaders: true,
        template: $("#page-template").html(),
        scale: 0.8,
        fileName: "reporte.pdf",
        exportOnlyData:"true"
    },
      scrollable: true,
      columnMenu: true,
      filterable: true,
      resizable: true,
      groupable: true,
       
      pageable: { refresh: true },
      columns: [
        { field: "barcode", title: "No de serie", filterable: { search: true } },
        {
          field: "code", aggregates: ["count"], title: "Código",
          groupHeaderTemplate: "Código: #= value # (#= count#)", filterable: { multi: true, search: true, search: true }
        },
        { field: "description", title: "Producto", filterable: { multi: true, search: true, search: true } },
        {
          field: "category", aggregates: ["count"], title: "Categoría",
          groupHeaderTemplate: "Categoría: #= value # (Cantidad: #= count#)", filterable: { multi: true, search: true, search: true }
        },
        { field: "brand", title: "Marca", filterable: { multi: true, search: true } },
        { field: "date", title: "F. Ingreso", filterable: { search: true, search: true }, format: "{0:dd/MM/yyyy}" },
        { field: "reference", title: "Referencia", filterable: { search: true, search: true } },
        { field: "state", aggregates: ["count"], title: "Estado", filterable: { multi: true, search: true, search: true },
        groupHeaderTemplate: " #= value # (Cantidad: #= count#)" },
        { field: "location", title: "Ubicación", filterable: { multi: true, search: true } },
        { field: "observation", title: "Observación", filterable: false }],
      dataBound: function(e){
        if (this.dataSource.group().length > 0) {
          console.log($(".k-grouping-row"));

          for (var i = 0; i < $(".k-grouping-row").length; i++) {
           this.collapseGroup($(".k-grouping-row")[i]);
          }
       
    }
      }
    });
    function showDetails(e) {
      e.preventDefault();
      var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

      switch (dataItem.state) {
        case 1:
          alert('No se puede reservar un producto entregado');
          break;
        case 2:
          alert('El producto ya se encuentra reservado');
          break;
        default:
          var confirmation =
            confirm("¿Está seguro que desea reservar el producto con número de serie: " + dataItem.barcode + "?");
          if (confirmation) {
            alert('El producto con número de serie: ' + dataItem.barcode + " ha sido reservado");
          } else {

          }
          break;
      }


    }
  });
