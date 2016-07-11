var mobileLibraryCircles;
var libraryCircles;
var mobilesDisplayed = false;
var librariesDisplayed = true;
var map;

$(function () {
    var boundary, librariesJSON, mobileLibrariesJSON;
    $.when(
        $.getJSON('/data/Boundary_Banes.json', function (data) {
            boundary = data;
        }),
        $.getJSON('/data/Mobiles_Banes.json', function (data) {
            mobileLibrariesJSON = data;
        }),
        $.getJSON('/data/Libraries_Banes.json', function (data) {
            librariesJSON = data;
        })
    ).then(function () {
        // create a map in the "map" div, set the view to a given place and zoom
        map = L.map('map').setView([51.360829369113446, -2.480187706610642], 11);
        // add an OpenStreetMap tile layer
        L.tileLayer('http://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // Add the boundary layer for banes.
        L.geoJson(boundary, { weight: 2, fill: false }).addTo(map);
        mobileLibraryCircles = L.layerGroup();
        libraryCircles = L.layerGroup();
        $.each(librariesJSON, function () {
            libraryCircles.addLayer(L.circle([this.lattitude, this.longitude], 1609, { weight: 1, stroke: false }));
        });
        $.each(mobileLibrariesJSON, function () {
            mobileLibraryCircles.addLayer(L.circle([this.lattitude, this.longitude], 1609, { weight: 1, stroke: false }));
        });
        map.addLayer(libraryCircles);
    });
});

function toggleMobileLibraries() {
    if (mobilesDisplayed) {
        map.removeLayer(mobileLibraryCircles);
        mobilesDisplayed = false;
    }
    else {
        map.addLayer(mobileLibraryCircles);
        mobilesDisplayed = true;
    }
}