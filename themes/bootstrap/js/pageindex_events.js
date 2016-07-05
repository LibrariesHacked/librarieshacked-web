$(function () {
    var tiles = L.tileLayer('https://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, Points &copy 2012 LINZ'
    });

    var latlng = L.latLng(53.5, -2.6);
    var map = L.map('map', { center: latlng, layers: [tiles], scrollWheelZoom: false });
    var bounds = [[53.5, -2.6]];

    $.each(hackEvents, function () {
        var popupContent = '';
        if (this.popup) popupContent += '<h3>' + this.popup + '<h3>';
        if (this.location) popupContent += '<small>' + this.location + '</small>';
        var redMarker = L.AwesomeMarkers.icon({ icon: 'fa-book', markerColor: getRandomColour() });
        if (this.lat != '' && this.lng != '') {
            L.marker(new L.LatLng(this.lat, this.lng), { icon: redMarker }).addTo(map).bindPopup(popupContent);
            bounds.push([this.lat, this.lng]);
        }
    });
    map.fitBounds(bounds);

    function getRandomColour() {
        var colours = ['red',//and,'
            'yellow',//and
            'pink',//and
            'blue',
            'purple',//and
            'orange',//and
            'green'//i can sing a rainbow, sing a rainbow, sing a rainbow too
        ];
        return colours[Math.floor(Math.random() * colours.length)];
    }
});