$(function () {

    var newsData = [];
    var locations = [];
    var locationsObj = {};

    function click() {
        $('.modal-header').text(this.textContent);
        $('.modal-body').html(locationsObj[this.textContent].text);
        $('#infoModal').modal('show');
    }

    function mouseover(p) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display", "none");
        d3.select(g).selectAll("text.value").style("display", "block");
    }

    function mouseout(p) {
        var g = d3.select(this).node().parentNode;
        d3.select(g).selectAll("circle").style("display", "block");
        d3.select(g).selectAll("text.value").style("display", "none");
    }

    $.getJSON("https://www.librarieshacked.org/themes/bootstrap/data/data_publiclibrariesnews2015.json", function (data) {
        $('#progress').hide();
        newsData = data;
        $.each(data, function (i, item) {
            var month = moment(item.Date).format('MMM');
            if (month != '') {
                var location = item.Location.trim();
                if (!locationsObj[location]) locationsObj[location] = {};

                if (locationsObj[location].months && locationsObj[location].months[month]) {
                    locationsObj[location].months[month]++;
                } else {
                    if (!locationsObj[location]["months"]) locationsObj[location]["months"] = {};
                    locationsObj[location].months[month] = 1;
                }

                if (!locationsObj[location].text) locationsObj[location].text = '';
                locationsObj[location].text += '<p class="lead">' + moment(item.Date, 'DD MMM YYYY hh:mm:ss').format('MMMM Do') + '</p><small><a href="' + item.URL + '" target="_blank">PLN ' + item.Date + '</a></small><p>' + item.Story + '</p><br/>';
            }
        });

        Object.keys(locationsObj).sort().forEach(function (key) {
            var stories = [];
            var total = 0;
            $.each(locationsObj[key].months, function (key, item) {
                total += item;
                var monthData = [key, item];
                stories.push(monthData);
            });
            locations.push({ stories: stories, name: key, text: locationsObj[key].text, total: total });
        });

        var margin = { top: 20, right: 200, bottom: 0, left: 20 }
        var width = 360;
        var height = 3800;

        var c = d3.scale.category20c();
        var xScale = d3.scale.ordinal()
            .domain(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"])
            .rangeBands([0, width]);

        var svg = d3.select("#chart").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("margin-left", margin.left + "px")
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        for (var j = 0; j < locations.length; j++) {
            var g = svg.append("g").attr("class", "journal");

            var circles = g.selectAll("circle")
                .data(locations[j]['stories'])
                .enter()
                .append("circle");

            var text = g.selectAll("text")
                .data(locations[j]['stories'])
                .enter()
                .append("text");

            var rScale = d3.scale.linear()
                .domain([0, d3.max(locations[j]['stories'], function (d) { return d[1]; })])
                .range([2, 9]);

            circles
                .attr("cx", function (d, i) { return xScale(d[0]); })
                .attr("cy", j * 20 + 20)
                .attr("r", function (d) { return rScale(d[1]); })
                .style("fill", function (d) { return c(j); });

            text
                .attr("y", j * 20 + 25)
                .attr("x", function (d, i) { return xScale(d[0]); })
                .attr("class", "value")
                .text(function (d) { return d[1]; })
                .style("fill", function (d) { return c(j); })
                .style("display", "none");

            g.append("text")
                .attr("y", j * 20 + 25)
                .attr("x", width + 20)
                .attr("class", "label")
                .text(locations[j]['name'])
                .style("fill", function (d) { return c(j); })
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .on("click", click);
        };
    });
});