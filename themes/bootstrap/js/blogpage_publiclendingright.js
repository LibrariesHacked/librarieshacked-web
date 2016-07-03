$(function () {
    $('#uk').CSVToTable('{{ theme_url }}/data/UK_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#uk table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#uk div.dataTables_wrapper');
    });

    $('#east').CSVToTable('{{ theme_url }}/data/East_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#east table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#east div.dataTables_wrapper');
    });

    $('#eastmidlands').CSVToTable('{{ theme_url }}/data/EastMidlands_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#eastmidlands table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#eastmidlands div.dataTables_wrapper');
    });

    $('#london').CSVToTable('{{ theme_url }}/data/London_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#london table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#london div.dataTables_wrapper');
    });

    $('#northeast').CSVToTable('{{ theme_url }}/data/NorthEast_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#northeast table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#northeast div.dataTables_wrapper');
    });

    $('#northernireland').CSVToTable('{{ theme_url }}/data/NorthernIreland_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#northernireland table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#northernireland div.dataTables_wrapper');
    });

    $('#northwestmerseyside').CSVToTable('{{ theme_url }}/data/NorthWestMerseyside_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#northwestmerseyside table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#northwestmerseyside div.dataTables_wrapper');
    });

    $('#scotland').CSVToTable('{{ theme_url }}/data/Scotland_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#scotland table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#scotland div.dataTables_wrapper');
    });

    $('#southeast').CSVToTable('{{ theme_url }}/data/SouthEast_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#southeast table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#southeast div.dataTables_wrapper');
    });

    $('#southwest').CSVToTable('{{ theme_url }}/data/SouthWest_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#southwest table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#southwest div.dataTables_wrapper');
    });

    $('#wales').CSVToTable('{{ theme_url }}/data/Wales_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#wales table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#wales div.dataTables_wrapper');
    });

    $('#westmidlands').CSVToTable('{{ theme_url }}/data/WestMidlands_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#westmidlands table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#westmidlands div.dataTables_wrapper');
    });

    $('#yorkshirehumber').CSVToTable('{{ theme_url }}/data/YorkshireHumber_Top100Titles.csv', { tableClass: 'table table-striped table-condensed', headers: ['#', 'ISBN', 'title', 'contributor', 'publisher', 'year'], startLine: 1 }).bind("loadComplete", function () {
        var table = $('#yorkshirehumber table').DataTable();
        var tt = new $.fn.dataTable.TableTools(table, { "sSwfPath": "{{ theme_url }}/swf/copy_csv_xls.swf", "aButtons": [{ "sExtends": "csv", "sButtonClass": "btn-sm btn-primary btn-flat" }, { "sExtends": "copy", "sButtonClass": "btn-sm btn-success btn-flat" }, { "sExtends": "print", "sButtonClass": "btn-sm btn-danger btn-flat" }] });
        $(tt.fnContainer()).insertBefore('#yorkshirehumber div.dataTables_wrapper');
    });
});