$(function () {
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