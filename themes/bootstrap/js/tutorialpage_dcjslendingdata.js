d3.csv("/data/BathHacked_LibraryLendingTransactions.csv", function (data) {

    var parseDate = d3.time.format("%m/%d/%Y 12:00:00 AM").parse;
    data.forEach(function (d) {
        d.date = parseDate(d.IssueDate);
    });
    var ndx = crossfilter(data);

    // set up the dimensions
    var dateDim = ndx.dimension(function (d) { return d.date; });
    var categoryDim = ndx.dimension(function (d) { return d.CIPFACategoryName; });
    var typeDim = ndx.dimension(function (d) {
        if (d.CIPFACategoryName.indexOf('Adult') != -1) return 'Adult';
        if (d.CIPFACategoryName.indexOf('Children') != -1) return 'Children';
        return 'Undefined';
    });
    var libraryDim = ndx.dimension(function (d) { return d.LibraryName; });
    var libraryTypeDim = ndx.dimension(function (d) {
        if (d.LibraryName.indexOf('Mobile') != -1) return 'Mobile';
        if (d.LibraryName.indexOf('Web') != -1) return 'Web';
        if ((d.LibraryName.indexOf('Council') != -1) || (d.LibraryName.indexOf('Callpoint') != -1)) return 'Council';
        return 'Static';
    });

    // set up the groups
    var dateDimGroup = dateDim.group();
    var categoryDimGroup = categoryDim.group();
    var typeDimGroup = typeDim.group();
    var libraryTypeDimGroup = libraryTypeDim.group();
    var libraryGroup = libraryDim.group();

    var minDate = dateDim.bottom(1)[0].date;
    var maxDate = dateDim.top(1)[0].date;

    // tie the placeholders in the HTML to variables in order to render the charts.
    var libraryChart = dc.rowChart('#chart-library-row');
    var totalLine = dc.lineChart("#chart-date-line");
    var categoryChart = dc.barChart("#chart-category-bar");
    var type = dc.pieChart("#chart-type-pie");
    var libraryType = dc.pieChart("#chart-librarytype-pie");

    libraryChart
        .width(300)
        .height(300)
        .group(libraryGroup)
        .dimension(libraryDim)
        .elasticX(true)
        .xAxis().ticks(4);

    categoryChart
        .width(300)
        .height(200)
        .gap(1)
        .margins({ top: 0, right: 0, bottom: 95, left: 30 })
        .group(categoryDimGroup)
        .dimension(categoryDim)
        .elasticY(true)
        .xUnits(dc.units.ordinal)
        .brushOn(false)
        .x(d3.scale.ordinal())
        .renderHorizontalGridLines(true);

    categoryChart.on("postRender", function (c) {
        d3.selectAll('#chart-category-bar .axis.x text').style("text-anchor", "end").attr("transform", function (d) { return "rotate(-90, -4, 9) "; });
    });

    totalLine
        .width(490)
        .height(200)
        .margins({ top: 5, right: 10, bottom: 20, left: 50 })
        .renderArea(true)
        .group(dateDimGroup, "Count of transactions")
        .elasticX(true)
        .elasticY(true)
        .dimension(dateDim)
        .renderHorizontalGridLines(true)
        .brushOn(false)
        .yAxisPadding("20%")
        .x(d3.time.scale().domain([minDate, maxDate]));

    type
        .width(180)
        .height(180)
        .radius(80)
        .dimension(typeDim)
        .group(typeDimGroup)
        .renderLabel(true)
        .innerRadius(10)
        .transitionDuration(500)
        .colorAccessor(function (d, i) { return d.value; });

    libraryType
        .width(180)
        .height(180)
        .radius(80)
        .dimension(libraryTypeDim)
        .group(libraryTypeDimGroup)
        .renderLabel(true)
        .innerRadius(10)
        .transitionDuration(500)
        .colorAccessor(function (d, i) { return d.value; });

    dc.renderAll();
});