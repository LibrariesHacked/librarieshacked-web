$(function() {
    // Initialise the map.
    var tiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    });

    // OnLoad:  Get the libraries data and loop through it.
    $.get('/data/Libraries_All.json', function(libraries){
        var latlng = L.latLng(53.5, -2.6);
        var map = L.map('map', { center: latlng, zoom: 6, layers: [tiles] });
        var markers = L.markerClusterGroup();
        for (var i = 0; i < libraries.length; i++) {
            if (libraries[i].y && libraries[i].l && libraries[i].t) {
                var a = libraries[i];
                var title = a.t;
                var marker = L.marker(new L.LatLng(a.y, a.l), { title: title });
                marker.bindPopup(title);
                markers.addLayer(marker);
            }
        }
        map.addLayer(markers);
    });
});