$(function () {
    Papa.parse('/data/UK_Catalogues_Security.csv', {
        download: true,
        complete: function (results) {
            var dataSet = results.data.slice(1);
            $('#tblCatalogues').DataTable({
                data: dataSet,
                columns: [
                    { title: "Library service", data: 0 },
                    { title: "Uses HTTPS", data: 2 },
                    { title: "Issues?", data: 3 },
                    { title: "Web domain", data: 1 }
                ],
                responsive: true
            });
        }
    });
});