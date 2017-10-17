var roles = [{
    "value": 1,
    "text": "Usuario"
}, {
    "value": 2,
    "text": "Administrador"
}];



kendo.culture("es-ES");
$(document).ready(function () {

    dataSource = new kendo.data.DataSource({
        transport: {
            read: { url: "/product/readprice", dataType: "json" },
            update: { url: "/brand/update", type: "POST", dataType: "json" },
            destroy: { url: "/brand/delete", type: "POST", dataType: "json" },
            create: { url: "/brand/create", type: "POST", dataType: "json" },
            parameterMap: function (options, operation) {
                if (operation !== "read" && options.models) {
                    var datos = options.models[0]
                    return datos;
                }
            }
        },
        batch: true,
        pageSize: 10,
        serverFiltering: false,
        schema: {
            model: {
                id: "id",
                fields: {
                    name: { validation: { required: true, }, type: 'string' },
                    date: {type:'date'}
                }
            }
        },

        aggregate: [
            { field: "total", aggregate: "sum",  format:"{0:c2}" }
        ],
    }
    );

    $("#grid").kendoGrid({
        dataSource: dataSource,
        height: 475,
        filterable: true,
        resizable: true,
        groupable: true,
        pageable: { refresh: true, pageSizes: true, },
        toolbar: ['pdf','excel'],
        columns: [
            { field: "count", title: "Cantidad", filterable: false },
            { field: "code", title: "Código", filterable: { search: true } },
            { field: "description", title: "Producto", filterable: {multi: true, search: true } },
            { field: "bill", title: "Código de ingreso", filterable: { search: true } },
            { field: "name", title: "Proveedor", filterable: { search: true } },
            { field: "date", title: "Fecha de ingreso", filterable: { search: true },  format: "{0:dd/MM/yyyy}" },
            {field: "reference", title: "Referencía"},
            { field: "price", title: "Costo Unitario", filterable: { search: true }, format:"{0:c2}" },
            { field: "total", title: "Costo Total", filterable: { search: true },footerTemplate: "Total: $#: data.total ? sum: 0 #", format:"{0:c2}" }],
            
        editable: "inline"
    });
});
function redirect(category) {
    window.location.href = category;
}