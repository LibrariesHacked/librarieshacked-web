$(function () {
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
    buildDataTable('#uk', '/data/PLR_2015_East_Top100Titles.csv');
    buildDataTable('#east', '/data/PLR_2015_EastMidlands_Top100Titles.csv');
    buildDataTable('#london', '/data/PLR_2015_London_Top100Titles.csv');
    buildDataTable('#northeast', '/data/PLR_2015_NorthEast_Top100Titles.csv');
    buildDataTable('#northernireland', '/data/PLR_2015_NorthernIreland_Top100Titles.csv');
    buildDataTable('#northwest', '/data/PLR_2015_NorthWestMerseyside_Top100Titles.csv');
    buildDataTable('#scotland', '/data/PLR_2015_Scotland_Top100Titles.csv');
    buildDataTable('#southeast', '/data/PLR_2015_SouthEast_Top100Titles.csv');
    buildDataTable('#southwest', '/data/PLR_2015_SouthWest_Top100Titles.csv');
    buildDataTable('#wales', '/data/PLR_2015_Wales_Top100Titles.csv');
    buildDataTable('#westmidlands', '/data/PLR_2015_WestMidlands_Top100Titles.csv');
    buildDataTable('#yorkshirehumber', '/data/PLR_2015_YorkshireHumber_Top100Titles.csv');
});