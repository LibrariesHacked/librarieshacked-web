var mobile_library_circles, library_circles, mobiles_displayed = false, libraries_displayed = true, map;

//////////////////////////////////////////////////////////////
// Function: toggleMobileLibraries
//////////////////////////////////////////////////////////////
var toggleMobileLibraries = function() {
    if (mobiles_displayed) {
        map.removeLayer(mobile_library_circles);
        $('#sp-toggle').attr('class', 'fa fa-toggle-off');
        mobiles_displayed = false;
    } else {
        map.addLayer(mobile_library_circles);
        $('#sp-toggle').attr('class', 'fa fa-toggle-on');
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
        map = L.map('map').setView([51.3608, -2.4801], 11);

        // Add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png', { attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);

        // Add the boundary layer for banes.
        L.geoJson(boundary, { color: sitecolours.info, weight: 2, opacity: 0.8, fill: false }).addTo(map);
        mobile_library_circles = L.layerGroup();
        library_circles = L.layerGroup();
        $.each(libraries_json, function () {
            library_circles.addLayer(L.circle([this.lattitude, this.longitude], 1609, { color: sitecolours.info, fill: true, opacity: 0.9, weight: 1, stroke: false }));
        });
        $.each(mobile_libraries_json, function () {
            mobile_library_circles.addLayer(L.circle([this.lattitude, this.longitude], 1609, { color: sitecolours.info, weight: 1, stroke: false }));
        });
        map.addLayer(library_circles);
    });

    $('#btntoggle').on('click', function(e){ 
        e.preventDefault();
        toggleMobileLibraries(); 
    });
});