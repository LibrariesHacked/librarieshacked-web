$(function () {
    var url = "https://datasette-yzbjpnaxvz.now.sh/csv-data-3e504e8.json?sql=select+urban_code%2C+grade+from+lottery+where+replace+%3D+%27[POSTCODE]%27";

	var classifications = {
		"A1": "Urban major conurbation",
		"B1": "Urban minor conurbation",
		"C1": "Urban city and town",
		"C2": "Urban city and town in a sparse setting",
		"D1": "Rural town and fringe",
		"D2": "Rural town and fringe in a sparse setting",
		"E1": "Rural village",
		"E2": "Rural village in a sparse setting",
		"F1": "Rural hamlets and isolated dwellings",
		"F2": "Rural hamlets and isolated dwellings in a sparse setting"
	};
	
	var grades = ["A*", "A", "B", "C", "D", "E", "F"];
	
	$('#btn-go').on('click', function(event){
		event.preventDefault();
		var postcode = $('#txt-postcode').val().replace(/ /g,'').toUpperCase();
		var postcode_search = url.replace('[POSTCODE]', postcode)
		$.ajax({
			url: postcode_search,
			dataType: 'json',
			success: function (data) {
				if (data && data.rows && data.rows.length > 0) {
					var result = data.rows[0];
					var class_key = result[0];
					var grade_index = result[1];
					var grade = grades[grade_index - 1];
					var classification = classifications[class_key];
					$('#h-result-grade').text(grade);
					$('#p-result-details').text(postcode + '. This postcode has been graded on distance to nearest library, relative to other areas of the same classification: ' + classification + '.');
				} else {
					$('#h-result-grade').text('');
					$('#p-result-details').text('Could not find that postcode');
				}
			}
		});
		return false;
	});
});