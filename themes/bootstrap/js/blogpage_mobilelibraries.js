var mobile_library_circles, library_circles, mobiles_displayed = false, libraries_displayed = true, map;

//////////////////////////////////////////////////////////////
// Function: toggleMobileLibraries
//////////////////////////////////////////////////////////////
var toggleMobileLibraries = function() {
    if (mobiles_displayed) {
        map.removeLayer(mobile_library_circles);
        mobiles_displayed = false;
    } else {
        map.addLayer(mobile_library_circles);
        mobiles_displayed = true;
    }
};

//////////////////////////////////////////////////////////////
// On Load
//////////////////////////////////////////////////////////////
$(function () {
    var boundary, libraries_json, mobile_libraries_json;
    $.when(
        $.getJSON('/data/Boundary_Banes.json', function (data) { boundary = data; }),
        $.getJSON('/data/Mobiles_Banes.json', function (data) { mobile_libraries_json = data; }),
        $.getJSON('/data/Libraries_Banes.json', function (data) { libraries_json = data; })
    ).then(function () {
        // Create a map in the "map" div, set the view to a given place and zoom
        map = L.map('map').setView([51.360829369113446, -2.480187706610642], 11);

        // Add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add the boundary layer for banes.
        L.geoJson(boundary, { weight: 2, fill: false }).addTo(map);
        mobile_library_circles = L.layerGroup();
        library_circles = L.layerGroup();
        $.each(libraries_json, function () {
            libraryCircles.addLayer(L.circle([this.lattitude, this.longitude], 1609, { weight: 1, stroke: false }));
        });
        $.each(mobile_libraries_json, function () {
            mobile_library_circles.addLayer(L.circle([this.lattitude, this.longitude], 1609, { weight: 1, stroke: false }));
        });
        map.addLayer(library_circles);
    });

    $('#btn_toggle').on('click', function(e){ toggleMobileLibraries(); });
});