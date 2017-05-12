var tries = 0;

var getLibraryNews = function() {
    tries = tries + 1;
    var latlng = L.latLng(53.5, -2.6);
    var map = L.map('map', { center: latlng, zoom: 7 });
    
    L.tileLayer('https://{s}.tiles.mapbox.com/v3/librarieshacked.jefmk67b/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var yqlQuery = 'select content.content from atom where url=\'http://www.publiclibrariesnews.com/feed/atom\' and id!=\'http://www.publiclibrariesnews.com/?p=8488\'';
    var url = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURI(yqlQuery) + '&format=json&callback=?';

    // now the map is loaded, get public libraries news rss
    $.getJSON(url, function (data) {
        if (data && data.query.count && data.query.count > 0) {
            var locations = {};
            $.each(data.query.results.entry, function () {
                var stories = $("strong:contains('news by authority')", "<div>" + this.content + "</div>").parent().nextAll().find('li');
                $.each(stories, function () {
                    var html = this.innerHTML;
                    var text = "";
                    if (this.innerText) text = this.innerText;
                    if (this.textContent) text = this.textContent;
                    var split = text.split('–');

                    if (split[0]) {
                        var location = split[0].toLowerCase().trim();

                        if (locations[location] && locations[location].text) {
                            locations[location].text = locations[location].text + '<br/>' + html;
                            locations[location].number = locations[location].number + 1;
                        }
                        else {
                            locations[location] = { text: html, number: 1 };
                        }
                    }
                });
            });
            $.each(locations, function (key, value) {
                var lon = "";
                var lat = "";
                var popup = value;
                var geocodeUrl = 'https://nominatim.openstreetmap.org/search?q=' + key + ',uk&format=json&json_callback=?';
                $.getJSON(geocodeUrl, function (data) {
                    if (data.length != 0) {
                        for (var i = 0; i < data.length; i++) {

                            lon = data[i].lon;
                            lat = data[i].lat;

                            var size = "small";

                            if (value.number >= 5) size = "medium";
                            if (value.number >= 10) size = "large";

                            var newsIcon = L.divIcon({ html: '<div><span>' + value.number + '</span></div>', className: "marker-cluster marker-cluster-" + size, iconSize: new L.Point(40, 40) });

                            // add a marker in the given location, attach some popup content to it and open the popup
                            L.marker([lat, lon], { icon: newsIcon }).addTo(map)
                                .bindPopup(value.text);
                            break;
                        }
                    }
                });
                $('#pLoader').hide();
            });
        }
        else {
            if (tries < 4) getLibraryNews();
        }
    },
    function () {
        if (tries < 4) getLibraryNews();
    });
};

$(function(){
    getLibraryNews();
});