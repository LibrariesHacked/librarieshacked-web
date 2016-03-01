$(document).ready(function () {
    var yqlUrl = "https://query.yahooapis.com/v1/public/yql?q=select%20name%2C%20library%20from%20xml%20where%20url%20in%20(select%20url%20from%20uritemplate%20where%20template%3D%22http%3A%2F%2Fwww.oclc.org%2Fapps%2Foclc%2Fgls%3Faction%3D%2Fservice%2Flocation%2F%7Bitem%7D%22%20and%20item%20in%20(select%20ISO_code%20from%20xml%20where%20url%20%3D%20'http%3A%2F%2Foclc.org%2Fapps%2Foclc%2Fgls%3Faction%3D%2Fservice%2Fregion%2FEMEA%2Ftype%2FOCLC'%20and%20itemPath%3D'libstatsRegion.libstatsLocation.ISO_code'))%20AND%20itemPath%3D%22libstatsLocation%22&format=json&diagnostics=true";
    $.ajax({
        url: yqlUrl,
        dataType: "jsonp",
        success: function (data) {
            var countriesArray = [];
            if (data.query && data.query.results && data.query.results.libstatsLocation) {
                for (x = 0 ; x < data.query.results.libstatsLocation.length ; x++) {
                    if (data.query.results.libstatsLocation[x].library && data.query.results.libstatsLocation[x].library.lib_type) {
                        var name = '';
                        var users = '';
                        var librarians = '';
                        var libraries = '';
                        var expenditures = '';
                        var volumes = '';
                        if (data.query.results.libstatsLocation[x].name) name = data.query.results.libstatsLocation[x].name;
                        if (data.query.results.libstatsLocation[x].library.users) users = data.query.results.libstatsLocation[x].library.users.data.replace('NA', '');
                        if (data.query.results.libstatsLocation[x].library.librarians) librarians = data.query.results.libstatsLocation[x].library.librarians.data.replace('NA', '');
                        if (data.query.results.libstatsLocation[x].library.libraries) libraries = data.query.results.libstatsLocation[x].library.libraries.data.replace('NA', '');
                        if (data.query.results.libstatsLocation[x].library.expenditures) expenditures = data.query.results.libstatsLocation[x].library.expenditures.data.replace('NA', '');
                        if (data.query.results.libstatsLocation[x].library.volumes) volumes = data.query.results.libstatsLocation[x].library.volumes.data.replace('NA', '');
                        if (name != "" && users != "" && librarians != "" && libraries != "" && expenditures != "" && volumes != "" && data.query.results.libstatsLocation[x].library.lib_type == 'PUBLIC') {
                            var row = [name, volumes, librarians, users, libraries, expenditures];
                            countriesArray.push(row);
                        }
                    }
                }
                $('#example').dataTable({
                    "data": countriesArray,
                    "columns": [
                    { "name": "name" },
                    { "volumes": "data" },
                    { "librarians": "data" },
                    { "users": "data" },
                    { "libraries": "data" },
                    { "expenditures": "data" }
                    ]
                });
            }
        }
    });
});