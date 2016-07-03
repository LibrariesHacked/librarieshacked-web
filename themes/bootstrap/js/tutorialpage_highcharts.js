$(function () {
    // PapaParse takes the link to the CSV file, hosted at Leeds Data Mill
    Papa.parse('https://aql.datapress.com/leeds/dataset/library-computer-bookings/library-it-use.csv', {
        download: true,
        complete: function (results) {
            // The set of years (X-Axis) are in the first row of data (use data[0]), except the header row (use slice(1)).
            // This creates a category set that looks like ['2001/2002', '2002/2003', '...' ]
            var years = results.data[0].slice(1);
            // Create an array of series objects.
            // Each one will be of the form { name: 'Series name', data: [1,2,3,4,5] }
            // The data values will match the number of categories (years)
            var series = [];
            // Each row except the header (use slice(1) again) is a set of data for an individual library
            results.data.slice(1).forEach(function (item, index) {
                // For each column in the individual library row return it as a number (replacing the N/A values with zeros)
                var data = item.slice(1).map(function (val) {
                    return val != 'N/A' ? Number(val) : null;
                });
                // Add the library to the series array
                // Because there are so many libraries, the visibility of the library is only set for the first five
                // The user can then pick and choose which libraries to show.
                if (item[0]) series.push({ name: item[0], data: data, visible: (index < 2) });
            });

            // Construct the chart with some text options.
            // The series array is set as the series variable.
            // The years array is set as the X axis categories
            $('#chart').highcharts({
                title: { text: 'Leeds libraries IT usage' },
                subtitle: { text: 'Data from Leeds Data Mill' },
                xAxis: { categories: years },
                yAxis: { title: { text: 'Computer sessions' } },
                series: series
            });
        }
    });
});