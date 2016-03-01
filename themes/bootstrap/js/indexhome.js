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
					            var url = this.url;
					            var linkText = this.title;
					            if (this.type.indexOf('Hardware') != -1) {
					                url = '/hardware';
					                linkText = 'hardware';
					            }
					            if (this.type == 'Api') {
					                url = '/apis';
					                linkText = 'APIs';
					            }
					            if (this.type.indexOf('Event') != -1) {
					                url = '/events';
					                linkText = 'events';
					            }
					            if (this.type == 'FabLab') {
					                url = '/events';
					                linkText = 'events';
					            }
					            if (this.type == 'WebApp') {
					                url = '/apps';
					                linkText = 'apps';
					            }
					            if (this.type == 'MobileApp') {
					                url = '/apps';
					                linkText = 'apps';
					            }
					            if (this.type == 'OtherData') {
					                url = '/otherdata';
					                linkText = 'other data';
					            }
					            if (this.type == 'Article') {
					                linkText = 'full post';
					            }
					            if (this.type == 'Tutorial') {
					                linkText = 'tutorial';
					            }
					            $('#divResults div.row').append('<div class="col-lg-3 col-md-4 col-sm-6">'
									+ '<div class="panel panel-default">'
									+ '<div class="panel-body"><h4>' + this.title + '</h4><p>' + this.description + '</p>'
									+ '<p><a class="btn btn-flat btn-sm btn-primary" href="' + url + '" title="' + linkText + '"><i class="fa fa-ellipsis-h"></i>&nbsp;' + linkText + '</a></p>'
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