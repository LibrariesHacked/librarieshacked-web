var catalogues = new Array();
var proxyUrl = '/proxy.php?url=';
var cataloguesUrl = 'http://gb.mobilearena.axiell.com:8080/arena.ps.pacs/utility';
var cataloguesSOAP = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><util:GetMobileAgencies xmlns:util="http://utility.pacs.services.arena.axiell.com/"/></soap:Body></soap:Envelope>';
var catalogueSearchSOAP = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ser:Search xmlns:ser="http://service.search.palma.services.arena.axiell.com/" xmlns:sear="http://axiell.com/arena/services/palma/search/searchrequest" xmlns:util="http://axiell.com/arena/services/palma/util"><sear:searchRequest><util:arenaMember>[[ARENA_MEMBER_ID]]</util:arenaMember><util:language>en</util:language><sear:pageSize>[[PAGE_SIZE]]</sear:pageSize><sear:page>[[PAGE]]</sear:page><sear:sortOrder><field>relevance</field><direction>descending</direction></sear:sortOrder><sear:query>[[SEARCH_QUERY]]</sear:query><sear:covers util:enable="no" /><sear:facets util:enable="yes"><sear:facet count="5">mediaclass_facet</sear:facet></sear:facets><sear:queryFacets>[[SEARCHFACETS]]</sear:queryFacets><sear:queryFilter>[[QUERYFILTER1]]</sear:queryFilter></sear:searchRequest></ser:Search></soap:Body></soap:Envelope>';
var catalogueCheckSOAP = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ser:Search xmlns:ser="http://service.search.palma.services.arena.axiell.com/" xmlns:sear="http://axiell.com/arena/services/palma/search/searchrequest" xmlns:util="http://axiell.com/arena/services/palma/util"><sear:searchRequest><util:arenaMember>[[ARENA_MEMBER_ID]]</util:arenaMember><util:language>en</util:language><sear:pageSize>0</sear:pageSize><sear:page>1</sear:page><sear:sortOrder><field>relevance</field><direction>descending</direction></sear:sortOrder><sear:query></sear:query><sear:covers util:enable="no" /><sear:facets util:enable="yes"><sear:facet count="5">mediaclass_facet</sear:facet><sear:facet count="5">language_facet</sear:facet></sear:facets></sear:searchRequest></ser:Search></soap:Body></soap:Envelope>';
var catalogueDetailSOAP = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body><ser:GetCatalogueRecordDetail xmlns:ser="http://service.search.palma.services.arena.axiell.com/" xmlns:cat="http://axiell.com/arena/services/palma/search/catalogueRecordDetailrequest" xmlns:util="http://axiell.com/arena/services/palma/util" xmlns:crd="http://axiell.com/arena/services/palma/util/crd"><cat:catalogueRecordDetailRequest><util:arenaMember>[[ARENA_MEMBER_ID]]</util:arenaMember><crd:id>[[CATALOGUE_RECORD_ID]]</crd:id><util:language>en</util:language><cat:cover util:enable="yes" /><cat:holdings enable="yes"/></cat:catalogueRecordDetailRequest></ser:GetCatalogueRecordDetail></soap:Body></soap:Envelope>';
var currentMember = '';
var count = 0;

$(function () {

    $('#divSearch').hide();
    $('#divResults').hide();
    $('#btnNavigation').hide();
    $('#divItemDetails').hide();

    $.ajax({
        url: proxyUrl + encodeURIComponent(cataloguesUrl),
        type: 'POST',
        data: { data: cataloguesSOAP },
        dataType: 'json',
        success: function (data) {
            var items = $($.parseXML(data.contents)).find("installation");
            $.each(items, function () {
                var serviceUrl = $('palmaBaseUrl', this).text();
                var members = $(this).find('agency arenaMember');
                $.each(members, function () {
                    var memberId = $('id', this).text();
                    var name = $('name', this).text();
                    $.ajax({
                        url: proxyUrl + encodeURIComponent(serviceUrl + '/catalogue'),
                        type: 'POST',
                        data: { data: catalogueCheckSOAP.replace('[[ARENA_MEMBER_ID]]', memberId) },
                        dataType: 'json',
                        success: function (data) {
                            if (data.contents && data.contents.indexOf('soap') != -1) {

                                var languages = [];
                                var mediatypes = [];
                                var xmlDoc = $.parseXML(data.contents);
                                var totalItems = $('nofRecordsTotal', xmlDoc).text();
                                var languageItems = $(xmlDoc).find('language_facet');
                                var mediaItems = $(xmlDoc).find('mediaclass_facet');

                                $.each(mediaItems, function () {
                                    mediatypes.push({ type: $('name', this).text(), count: $('count', this).text(), value: $('code', this).text() });
                                });

                                $.each(languageItems, function () {
                                    languages.push({ type: $('name', this).text(), count: $('count', this).text(), value: $('code', this).text() });
                                });

                                var html = '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 catlink">';
                                html += '<a href="#" class="thumbnail" onclick="selectCatalogue(' + memberId + '); return false;">';
                                html += '<h4>' + name + '</h4>';
                                html += '<small>' + totalItems + ' items</small>';
                                html += '</a></div>';

                                $('#divCatalogues .row').append(html);
                                count++;

                                if ((count % 2) == 0) $('#divCatalogues .row').append('<div class="clearfix visible-xs"></div>');
                                if ((count % 3) == 0) $('#divCatalogues .row').append('<div class="clearfix visible-sm"></div>');
                                if ((count % 4) == 0) $('#divCatalogues .row').append('<div class="clearfix visible-md"></div>');
                                if ((count % 6) == 0) $('#divCatalogues .row').append('<div class="clearfix visible-lg"></div>');

                                catalogues[memberId] = { url: serviceUrl, languages: languages, mediatypes: mediatypes, totalitems: totalItems, name: name };
                            }
                        },
                        error: function () {
                            $('#lgdCatalogueName').text('unable to retrieve catalogues');
                        }
                    });
                });
            });
        }
    });
});

function selectCatalogue(id) {

    $('#btnNavigation').show();
    $("#btnNavigation").click(function () {
        showAllCatalogues();
    });

    $('#selLanguage').empty();
    $('#selMedia').empty();
    $('#divCatalogues').hide(700);
    $('#divSearch').show();
    currentMember = id;

    $('#lgdCatalogueName').text('search ' + catalogues[currentMember].name);

    $('#selLanguage').append($("<option/>", { value: '', text: '' }));
    $.each(catalogues[currentMember].languages, function () {
        $('#selLanguage').append($("<option/>", { value: this.value, text: this.type + ' (' + this.count + ' titles)' }));
    });

    $('#selMedia').append($("<option/>", { value: '', text: '' }));
    $.each(catalogues[currentMember].mediatypes, function () {
        $('#selMedia').append($("<option/>", { value: this.value, text: this.type + ' (' + this.count + ' titles)' }));
    });
}

function search() {

    $('#btnNavigation').text('search again');
    $("#btnNavigation").off('click');
    $("#btnNavigation").click(function () {
        searchAgain();
    });

    $('#divDescription').empty();
    $('#divHoldings .row').empty();
    $('#divItemDetails').hide(700);
    $('#divResults .row').empty();
    var term = $('#txtSearch').val();

    var booksUrl = encodeURIComponent(catalogues[currentMember].url + '/catalogue');
    booksUrl = proxyUrl + booksUrl;

    var searchFacets = '<sear:language_facets>';
    $('#selLanguage :selected').each(function (i, selected) {
        if ($(selected).val() != '') searchFacets += '<sear:language_facet>' + $(selected).val() + '</sear:language_facet>';
    });
    searchFacets += '</sear:language_facets>';
    searchFacets += '<sear:mediaClass_facets>';
    $('#selMedia :selected').each(function (i, selected) {
        if ($(selected).val() != '') searchFacets += '<sear:mediaClass_facet>' + $(selected).val() + '</sear:mediaClass_facet>';
    });
    searchFacets += '</sear:mediaClass_facets>';

    $.ajax({
        url: booksUrl,
        type: "POST",
        data: { data: catalogueSearchSOAP.replace('[[ARENA_MEMBER_ID]]', currentMember).replace('[[PAGE_SIZE]]', '12').replace('[[PAGE]]', '1').replace('[[SEARCH_QUERY]]', term).replace('[[SEARCHFACETS]]', searchFacets).replace('[[QUERYFILTER1]]', '') },
        dataType: "json",
        success: function (data) {
            var xmlDoc = $.parseXML(data.contents);
            var totalItems = $('nofRecordsTotal', xmlDoc).text();
            var items = $(xmlDoc).find("catalogueRecord");

            if (totalItems > 0) $('#pResults').text('showing up to 12 of ' + totalItems + ' results.');

            count = 0;
            $.each(items, function () {
                var html = '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6 catlink">';
                html += '<a href="#" class="thumbnail" onclick="selectItem(\'' + $('id', this).text() + '\'); return false;">';
                html += '<h4>' + $('author', this).text() + '</h4>';
                html += '<small>' + $('title', this).text() + '</small><br/>';
                if ($('category', this).text() != "") html += '<small>' + $('category', this).text() + '</small><br/>';
                if ($('publisher', this).text() != "") html += '<small>' + $('publisher', this).text() + '</small>';
                html += '<small class="text-success">' + $('mediaClass', this).text() + '</small>';
                if ($('targetAudience', this).text() != "") html += ' | <small class="text-primary">' + $('targetAudience', this).text() + '</small>';
                html += '</a></div>';

                $('#divResults .row').append(html);
                count++;

                if ((count % 2) == 0) $('#divResults .row').append('<div class="clearfix visible-xs"></div>');
                if ((count % 3) == 0) $('#divResults .row').append('<div class="clearfix visible-sm"></div>');
                if ((count % 4) == 0) $('#divResults .row').append('<div class="clearfix visible-md"></div>');
                if ((count % 6) == 0) $('#divResults .row').append('<div class="clearfix visible-lg"></div>');
            });

            $('#divResults').show(700);
            $('#divSearch').hide(700);
            $('#divSearchProgress').hide();
        },
        error: function () {
            $('#divResults').show();
            $('#pResults').text('error searching library catalogue.');
            $('#prgSearchResults').hide();
        }
    });
}

function selectItem(id) {

    $('#btnNavigation').text('return to results');
    $("#btnNavigation").off('click');
    $("#btnNavigation").click(function () {
        returnToResults();
    });

    $('#divItemDetails').show(700);
    $('#divHoldings').show();
    $('#divResults').hide(700);
    $('#divDescription').empty();
    $('#divHoldings .row').empty();
    $('#divItemProgress').show();

    $.ajax({
        url: proxyUrl + encodeURIComponent(catalogues[currentMember].url + '/catalogue'),
        type: "POST",
        data: { data: catalogueDetailSOAP.replace('[[ARENA_MEMBER_ID]]', currentMember).replace('[[CATALOGUE_RECORD_ID]]', id) },
        dataType: "json",
        success: function (data) {
            var xmlDoc = $.parseXML(data.contents);
            var title = $('title', xmlDoc).text();

            var author = $('author', xmlDoc).map(function () {
                return this.innerHTML;
            }).get().join(", ");

            var description = $('description', xmlDoc).text();
            var nofAvailableForLoan = $('nofAvailableForLoan', xmlDoc).text();
            var isbn = $('isbn', xmlDoc).text();
            var nofReservations = $('nofReservations', xmlDoc).text();
            var nofLoansYear = $('nofLoansYear', xmlDoc).text();
            var nofLoansTotal = $('nofLoansTotal', xmlDoc).text();
            var reservable = $('reservable', xmlDoc).text();
            var cover = $('cover', xmlDoc).text();
            var numberAvailable = $('nofAvailableForLoan', xmlDoc).text();

            var html = '<div class="media well">';
            html += '<div class="media-left">';
            html += '<img src="data:image/jpeg;base64, ' + cover + '" alt="">';
            html += '</div>';
            html += '<div class="media-body">';
            html += '<h4 class="media-heading">' + title + '</h4>' + author + '<br/><small>' + description + '</small><br/>';
            html += '<span class="label label-warning">available: ' + numberAvailable + '</span>&nbsp; ';
            html += '<span class="label label-success">loans history: ' + nofLoansTotal + ' times</span>&nbsp; ';
            html += '<span class="label label-danger">reservable: ' + reservable + '</span>&nbsp; ';
            html += '<span class="label label-info">reservations: ' + nofReservations + '</span>&nbsp; ';
            html += '</div>';
            html += '</div>';

            var holdings = $(xmlDoc).find('holding');

            $('#divDescription').append(html);

            count = 0;
            $.each(holdings, function () {
                var status = $(this).attr('status').replace('availableForLoan', 'available for loan').replace('nonAvailableForLoan', 'unavailable for loan');
                var firstLoanDueDate = $(this).attr('firstLoanDueDate');

                var holdingsHTML = '<div class="col-lg-2 col-md-3 col-sm-4 col-xs-6">';
                holdingsHTML += '<div class="panel panel-success">';
                holdingsHTML += '<div class="panel-heading"><h4 class="panel-title">' + $(this).attr('branch') + '</h4><small>' + $(this).attr('organisation') + ' - ' + status + '</small></div>';
                holdingsHTML += '<div class="panel-collapse collapse in panel-body">';
                holdingsHTML += '<span class="label label-success">total: ' + $(this).attr('nofTotal') + '</span>&nbsp; ';
                holdingsHTML += '<span class="label label-warning">available: ' + $(this).attr('nofAvailableForLoan') + '</span>&nbsp; ';
                holdingsHTML += '<span class="label label-info">reference: ' + $(this).attr('nofReference') + '</span>&nbsp; ';
                holdingsHTML += '<span class="label label-default">ordered: ' + $(this).attr('nofOrdered') + '</span>&nbsp; ';
                holdingsHTML += '<span class="label label-primary">checked out: ' + $(this).attr('nofCheckedOut') + '</span>&nbsp; ';
                if (firstLoanDueDate && firstLoanDueDate != "") holdingsHTML += '<span class="label label-danger">due date: ' + firstLoanDueDate + '</span>';

                holdingsHTML += '</div>';
                holdingsHTML += '</div></div>';

                $('#divHoldings .row').append(holdingsHTML);
                count++;

                if ((count % 2) == 0) $('#divHoldings .row').append('<div class="clearfix visible-xs"></div>');
                if ((count % 3) == 0) $('#divHoldings .row').append('<div class="clearfix visible-sm"></div>');
                if ((count % 4) == 0) $('#divHoldings .row').append('<div class="clearfix visible-md"></div>');
                if ((count % 6) == 0) $('#divHoldings .row').append('<div class="clearfix visible-lg"></div>');

            });

            $('#divItemProgress').hide();
        }
    });
}

function showAllCatalogues() {
    $('#divDescription').empty();
    $('#divHoldings .row').empty();
    $('#divItemDetails').hide(700);
    $('#divSearch').hide(700);
    $('#divCatalogues').show(700);
    $('#btnNavigation').hide();
    $('#divResults').hide();
}

function returnToResults() {
    $('#divItemDetails').hide(700);
    $('#divResults').show(700);
    $('#divHoldings').hide();

    $('#btnNavigation').text('search again');
    $("#btnNavigation").off('click');
    $("#btnNavigation").click(function () {
        searchAgain();
    });
}

function searchAgain() {
    $('#divResults').hide(700);
    $('#divSearch').show(700);

    $('#btnNavigation').text('return to catalogues');
    $("#btnNavigation").off('click');
    $("#btnNavigation").click(function () {
        showAllCatalogues();
    });

}

function randomStyle() {
    var list = ['success', 'success', 'warning', 'danger', 'info'];
    return list[Math.floor(Math.random() * list.length)];
}