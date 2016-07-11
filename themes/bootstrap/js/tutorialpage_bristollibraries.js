var closingCircles, bristolBoundary, bristolLibraries, libraryCircles, map, closingDisplayed = false;

$(function () {
    $.when(
        $.getJSON('/data/Boundary_Bristol.json', function (data) {
            bristolBoundary = data;
        }),
        $.getJSON('/data/Libraries_Bristol.json', function (data) {
            bristolLibraries = data;
        })
    ).then(function () {
        // set up the leaflet map.  initial view of Bristol centre.
        map = L.map('map').setView([51.45, -2.60], 12);
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}' + (L.Browser.retina ? '@2x' : '') + '.png', {
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OSM</a> contributors, <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);

        // add the boundary layer for Bristol.
        L.geoJson(bristolBoundary, {
            weight: 2, fill: true, fillOpacity: 0.7, fillColor: '#FFF', color: '#999999', clickable: false,
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng, { opacity: 0, fillOpacity: 0, clickable: false });
            }
        }).addTo(map);
        // By default use 1609 metres.  
        addLayers(1609);
    });
});

function showProposedLibraries() {
    if (closingDisplayed) map.removeLayer(closingCircles);
    closingDisplayed = false;
}

function showAllLibraries() {
    if (!closingDisplayed) map.addLayer(closingCircles);
    closingDisplayed = true;
}

function changeRadius(rad) {
    map.removeLayer(libraryCircles);
    if (closingDisplayed) map.removeLayer(closingCircles);
    addLayers(rad);
}

function addLayers(radius) {

    closingCircles = L.layerGroup();
    libraryCircles = L.layerGroup();

    $.each(bristolLibraries, function () {
        var latlng = NEToLL(this.attributes.X, this.attributes.Y);
        var displayRadiusOptions = { clickable: false, weight: 1, stroke: false, fillColor: '#6699FF' };
        var displayMarkerOptions = { weight: 1, fillColor: '#6699FF' };
        var popupText = "<h4>" + this.value + "</h4>" + this.attributes.Street + ", " + this.attributes.Locality + ", " + this.attributes.Town + ", " + this.attributes.Postcode;
        if (this.closing) {
            closingCircles.addLayer(L.circle([latlng.latitude, latlng.longitude], radius, displayRadiusOptions));
            closingCircles.addLayer(L.circleMarker([latlng.latitude, latlng.longitude], displayMarkerOptions).setRadius(5).bindPopup(popupText));
        }
        else {
            libraryCircles.addLayer(L.circle([latlng.latitude, latlng.longitude], radius, displayRadiusOptions));
            libraryCircles.addLayer(L.circleMarker([latlng.latitude, latlng.longitude], displayMarkerOptions).setRadius(5).bindPopup(popupText));
        }
    });

    map.addLayer(libraryCircles);
    if (closingDisplayed) map.addLayer(closingCircles);
}

// function to convert between british national grid and lat/lng
// uses proj4js plugin
function NEToLL(east, north) {
    proj4.defs("NationalGrid", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
    var res = proj4('NationalGrid', 'WGS84', [east, north]);
    return { latitude: res[1], longitude: res[0] };
}