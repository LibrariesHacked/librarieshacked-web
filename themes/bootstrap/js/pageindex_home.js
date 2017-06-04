$(function () {
	//////////////////////////////////////////////////////
	//
	//////////////////////////////////////////////////////
	$.get('/pages', function(pages) {

		var data = [0, 0, 0, 0];
		var events_data = [];
		var events_labels = [];
		var events_backgroundcolors = [];
		var events_bordercolors = [];
		var projects_data = [0,0,0,0];
		var projects_labels = ['in progress', 'completed', 'learning code', 'app code'];
		var articles = {};
		$.each(pages, function(i, p) {

			if (p.type == 'NationalApi') data[0]++;
			if (p.type == 'CollectionApi') data[0]++;
			if (p.type == 'BibliographicApi') data[0]++;
			if (p.type == 'LibraryApi') data[0]++;
			if (p.type == 'AddressApi') data[0]++;
			if (p.type == 'ResearchApi') data[0]++;
			if (p.type == 'PublicInfoApi') data[0]++;
			if (p.type == 'Reports') data[1]++;
			if (p.type == 'Spreadsheet') data[2]++;
			if (p.type == 'ComputerFormat') data[3]++;
			if (p.type == 'Webpage') data[4]++;

			if (p.type == 'ProjectInProgress') projects_data[0]++;
			if (p.type == 'ProjectCompleted') projects_data[1]++;
			if (p.type == 'SourceLearning') projects_data[2]++;
			if (p.type == 'SourceApp') projects_data[3]++;

			if ((p.type == 'Tutorial' || p.type == 'Article') && p.date != '')  {
				var year = moment(p.date).format('YYYY');
				if (!articles[year]) articles[year] = { posts: 0, tutorials: 0 };
				if (p.type == 'Article') articles[year].posts++;
				if (p.type == 'Tutorial') articles[year].tutorials++;
			}

			if ((p.type == 'PastEvent' || p.type == 'Event') && p.date != '') {
				var year = moment(p.date).format('YYYY');
				var i = events_labels.indexOf(year)
				if (i == -1) {
					events_labels.push(year);
					var colour = sitecolours[Object.keys(sitecolours)[events_backgroundcolors.length]];
					events_backgroundcolors.push('rgba(' + hexToRGB(colour).r + ',' + hexToRGB(colour).g + ',' + hexToRGB(colour).b + ',0.2)');
					events_bordercolors.push('rgba(' + hexToRGB(colour).r + ',' + hexToRGB(colour).g + ',' + hexToRGB(colour).b + ',0.6)');
					events_data.push(1);
				} else {
					events_data[i]++; 
				}
			}
		});

		var databar = new Chart('cht-data', {
			type: 'bar',
			data: {
				labels: ['APIs', 'reports', 'sheets', 'data', 'web'],
				datasets: [{
					data: [12, 19, 3, 5, 2, 3],
					backgroundColor: [
						'rgba(' + hexToRGB(sitecolours.primary).r + ',' + hexToRGB(sitecolours.primary).g + ',' + hexToRGB(sitecolours.primary).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.secondary).r + ',' + hexToRGB(sitecolours.secondary).g + ',' + hexToRGB(sitecolours.secondary).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.success).r + ',' + hexToRGB(sitecolours.success).g + ',' + hexToRGB(sitecolours.success).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.warning).r + ',' + hexToRGB(sitecolours.warning).g + ',' + hexToRGB(sitecolours.warning).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.danger).r + ',' + hexToRGB(sitecolours.danger).g + ',' + hexToRGB(sitecolours.danger).b + ',0.2)'
					],
					borderColor: [
						'rgba(' + hexToRGB(sitecolours.primary).r + ',' + hexToRGB(sitecolours.primary).g + ',' + hexToRGB(sitecolours.primary).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.secondary).r + ',' + hexToRGB(sitecolours.secondary).g + ',' + hexToRGB(sitecolours.secondary).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.success).r + ',' + hexToRGB(sitecolours.success).g + ',' + hexToRGB(sitecolours.success).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.warning).r + ',' + hexToRGB(sitecolours.warning).g + ',' + hexToRGB(sitecolours.warning).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.danger).r + ',' + hexToRGB(sitecolours.danger).g + ',' + hexToRGB(sitecolours.danger).b + ',0.6)'
					],
					borderWidth: 1
				}]
			},
			options: {
				legend: {
					display: false
				},
				scales: {
					yAxes: [{
						ticks: {
							beginAtZero:true
						}
					}]
				}
			}
		});

		var eventsbar = new Chart('cht-events', {
			type: 'horizontalBar',
			data: {
				labels: events_labels,
				datasets: [{
					data: events_data,
					backgroundColor: events_backgroundcolors,
					borderColor: events_bordercolors,
					borderWidth: 1
				}]
			},
			options: {
				legend: {
					display: false
				}
			}
		});

		var projectspolar = new Chart('cht-projects', {
			data: {
				datasets: [{
					data: projects_data,
					backgroundColor: [
						'rgba(' + hexToRGB(sitecolours.primary).r + ',' + hexToRGB(sitecolours.primary).g + ',' + hexToRGB(sitecolours.primary).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.secondary).r + ',' + hexToRGB(sitecolours.secondary).g + ',' + hexToRGB(sitecolours.secondary).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.success).r + ',' + hexToRGB(sitecolours.success).g + ',' + hexToRGB(sitecolours.success).b + ',0.2)',
						'rgba(' + hexToRGB(sitecolours.warning).r + ',' + hexToRGB(sitecolours.warning).g + ',' + hexToRGB(sitecolours.warning).b + ',0.2)'
					],
					borderColor: [
						'rgba(' + hexToRGB(sitecolours.primary).r + ',' + hexToRGB(sitecolours.primary).g + ',' + hexToRGB(sitecolours.primary).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.secondary).r + ',' + hexToRGB(sitecolours.secondary).g + ',' + hexToRGB(sitecolours.secondary).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.success).r + ',' + hexToRGB(sitecolours.success).g + ',' + hexToRGB(sitecolours.success).b + ',0.6)',
						'rgba(' + hexToRGB(sitecolours.warning).r + ',' + hexToRGB(sitecolours.warning).g + ',' + hexToRGB(sitecolours.warning).b + ',0.6)'
					],
					borderWidth: 1,
				}],
				labels: projects_labels
			},
			type: 'polarArea',
			options: {
				legend: { 
					display: false
				}
			}
		});
		
		var article_labels = [];
		var posts = { 
			label: 'posts', 
			data: [], 
			borderWidth: 1, 
			borderColor: 'rgba(' + hexToRGB(sitecolours.primary).r + ',' + hexToRGB(sitecolours.primary).g + ',' + hexToRGB(sitecolours.primary).b + ',1)', 
			backgroundColor: 'rgba(' + hexToRGB(sitecolours.primary).r + ',' + hexToRGB(sitecolours.primary).g + ',' + hexToRGB(sitecolours.primary).b + ',0.1)' 
		};
		var tutorials = { 
			label: 'tutorials', 
			data: [], 
			borderWidth: 1, 
			borderColor: 'rgba(' + hexToRGB(sitecolours.success).r + ',' + hexToRGB(sitecolours.success).g + ',' + hexToRGB(sitecolours.success).b + ',1)',
			backgroundColor: 'rgba(' + hexToRGB(sitecolours.success).r + ',' + hexToRGB(sitecolours.success).g + ',' + hexToRGB(sitecolours.success).b + ',0.1)'
		};
		$.each(Object.keys(articles), function(i, k) {
			article_labels.push(k);
			posts.data.push(articles[k].posts);
			tutorials.data.push(articles[k].tutorials);
		});

		var articlesline = new Chart('cht-articles', {
			type: 'line',
			data: {
				labels: article_labels,
				datasets: [posts, tutorials]
			}
		});
	});


	//////////////////////////////////////////////////////
	//
	//////////////////////////////////////////////////////
    $("#txtSiteSearch").autocomplete({
        source: function (request, response) {
            $('#divResults div.row').empty();
            $('#divResults').hide();
            if (request.term.length > 4) {
                $.post("/search", { search: request.term })
					.done(function (data) {
					    if (data && data.length) {
					        $('#divResults').show();
					        $.each(data, function (index) {
					            var linkData = { url: this.url, text: this.title };
					            if (this.type.indexOf('Hardware') != -1) linkData = { url: '/hardware', text: 'hardware' };
					            if (this.type.indexOf('Api') != -1) linkData = { url: '/apis', text: 'APIs' };
					            if (this.type.indexOf('Event') != -1) linkData = { url: '/events', text: 'events' };
					            if (this.type.indexOf('FabLab') != -1) linkData = { url: '/events', text: 'events' };
					            if (this.type.indexOf('WebApp') != -1) linkData = { url: '/apps', text: 'apps' };
					            if (this.type.indexOf('MobileApp') != -1) linkData = { url: '/apps', text: 'apps' };
					            if (this.type.indexOf('OtherData') != -1) linkData = { url: '/otherdata', text: 'other data' };
					            if (this.type.indexOf('Article') != -1) linkData = { url: this.url, text: 'full post' };
					            if (this.type.indexOf('Tutorial') != -1) linkData = { url: this.url, text: 'tutorial' };
					            $('#divResults div.row').append('<div class="col-lg-3 col-md-4 col-sm-6">'
									+ '<div class="panel panel-default">'
									+ '<div class="panel-body"><h4>' + this.title + '</h4><p>' + this.description + '</p>'
									+ '<p><a class="btn btn-flat btn-sm btn-primary" href="' + linkData.url + '" title="' + linkData.text + '"><i class="fa fa-ellipsis-h"></i>&nbsp;' + linkData.text + '</a></p>'
									+ '</div></div>');
					            var count = index + 1;
					            if ((count % 4) == 0) $('#divResults div.row').append('<div class="clearfix visible-lg"></div>');
					            if ((count % 3) == 0) $('#divResults div.row').append('<div class="clearfix visible-md"></div>');
					            if ((count % 2) == 0) $('#divResults div.row').append('<div class="clearfix visible-sm"></div>');
					        });
					    }
					});
            }
        },
        minLength: 0
    });
});