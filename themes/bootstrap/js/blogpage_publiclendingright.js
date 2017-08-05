$(function () {

    ////////////////////////////////////////////////////
    // Function: 
    ////////////////////////////////////////////////////
    var buildDataTable = function (tableId, csv) {
        Papa.parse(csv, {
            download: true,
            complete: function (results) {
                var table = $(tableId).DataTable({
                    data: results.data.slice(1,100),
                    columns: [
                        { title: "Position" },
                        { title: "ISBN" },
                        { title: "Title" },
                        { title: "Contributor" },
                        { title: "Publisher" },
                        { title: "Year" }
                    ]
                });
            }
        });
    };

    ///////////////////////////////////////////////////////
    // On Load
    ///////////////////////////////////////////////////////
    buildDataTable('#tbl_uk', '/data/PLR_2015_East_Top100Titles.csv');
    buildDataTable('#tbl_east', '/data/PLR_2015_East_Top100Titles.csv');
    buildDataTable('#tbl_eastmidlands', '/data/PLR_2015_EastMidlands_Top100Titles.csv');
    buildDataTable('#tbl_london', '/data/PLR_2015_London_Top100Titles.csv');
    buildDataTable('#tbl_northeast', '/data/PLR_2015_NorthEast_Top100Titles.csv');
    buildDataTable('#tbl_northernireland', '/data/PLR_2015_NorthernIreland_Top100Titles.csv');
    buildDataTable('#tbl_northwest', '/data/PLR_2015_NorthWestMerseyside_Top100Titles.csv');
    buildDataTable('#tbl_scotland', '/data/PLR_2015_Scotland_Top100Titles.csv');
    buildDataTable('#tbl_southeast', '/data/PLR_2015_SouthEast_Top100Titles.csv');
    buildDataTable('#tbl_southwest', '/data/PLR_2015_SouthWest_Top100Titles.csv');
    buildDataTable('#tbl_wales', '/data/PLR_2015_Wales_Top100Titles.csv');
    buildDataTable('#tbl_westmidlands', '/data/PLR_2015_WestMidlands_Top100Titles.csv');
    buildDataTable('#tbl_yorkshirehumber', '/data/PLR_2015_YorkshireHumber_Top100Titles.csv');
});