function GetResults(search) {
    $('#divUrlResults').empty();
    var yqlQuery = "SELECT statuses(100) FROM twitter.search.tweets WHERE q='" + search + "' AND consumer_key='08ZNcNfdoCgYTzR7qcW1HQ' AND consumer_secret='PTMIdmhxAavwarH3r4aTnVF7iYbX6BRfykNBHIaB8' AND access_token='1181240586-JIgvJe4ev3NHdHnAqnovHINWfpo0qB2S2kZtVRI' AND access_token_secret='1nodv0LBsi7jS93e38KiW8cHOA5iUc6FT4L6De7kgk'"
    var yqlUrl = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURI(yqlQuery) + "&format=json&env=store://datatables.org/alltableswithkeys";
    $('#progressInfo').html('searching for links...');
    $('#divProg').css("width", "33%");
    $.ajax({
        url: yqlUrl,
        dataType: "jsonp",
        success: function (data) {
            var urlData = [];
            var yqlSelects = "";
            if (data && data.query && data.query.count && data.query.count > 0 && data.query.results.json) {
                $.each(data.query.results.json, function (key, value) {
                    if (this.statuses && this.statuses.entities && this.statuses.entities.urls) {
                        var tweet = { text: this.statuses.text, username: this.statuses.user.name, usertag: this.statuses.user.screen_name, link: '', tweetdate: this.statuses.created_at };
                        $.isArray(this.statuses.entities.urls) ? tweet.link = this.statuses.entities.urls[0].expanded_url : tweet.link = this.statuses.entities.urls.expanded_url;
                        if ($.grep(urlData, function (e) { return e.link == tweet.link; }).length == 0) {
                            if (tweet.link.length > 0 && urlData.length < 5) {
                                urlData.push(tweet);
                                yqlSelects += "select * from html where url = '" + tweet.link + "' and xpath='//title|//head/meta';"
                            }
                        }
                        else {
                            $.map(urlData, function (a) {
                                if (a.link == tweet.link) {
                                    a.username += "," + tweet.username;
                                    a.usertag += "," + tweet.usertag;
                                }
                            });
                        }
                    }
                });
                var yqlMetaQuery = 'select * from yql.query.multi where queries = "' + yqlSelects + '"';
                var yqlMetaUrl = "https://query.yahooapis.com/v1/public/yql?q=" + encodeURI(yqlMetaQuery) + "&format=json&diagnostics=true";
                $('#progressInfo').html('links found.  removed duplicates.  retrieving page data for ' + urlData.length + ' links...');
                $('#divProg').css("width", "66%");
                $.ajax({
                    url: yqlMetaUrl,
                    dataType: "jsonp",
                    success: function (data) {
                        if (data && data.query && data.query.results && data.query.results.results && data.query.count > 0) {
                            if ($.isArray(data.query.results.results)) {
                                $.each(data.query.results.results, function (i) {
                                    var description = "<br>";
                                    if (this.meta) {
                                        $.each(this.meta, function () {
                                            if (this.name == "description") description = this.content;
                                        });
                                    }
                                    var html = "<a class='list-group-item' href='" + urlData[i].link + "' target='_blank'><div class='row-content'><h4 class='list-group-item-heading'>" + (this.title ? this.title : urlData[i].link) + "</h4><p class='list-group-item-text'>" + description + "</p><p>" + urlData[i].text + " - link tweeted by <em>" + urlData[i].username + "</em></p></div></a><div class='list-group-separator'></div>";
                                    $('#divUrlResults').append(html);
                                });
                            }
                            else {
                                var description = "<br>";
                                if (data.query.results.results.meta) {
                                    $.each(data.query.results.results.meta, function () {
                                        if (this.name == "description") description = this.content;
                                    });
                                }
                                var html = "<a class='list-group-item' href='" + urlData[0].link + "' target='_blank'><div class='row-content'><h4 class='list-group-item-heading'>" + (data.query.results.results.title ? data.query.results.results.title : urlData[0].link) + "</h4><p class='list-group-item-text'>" + description + "</p><p class='list-group-item-text'>" + urlData[0].text + " - link tweeted by <em>" + urlData[0].username + "</em></p></div></a><div class='list-group-separator'></div>";
                                $('#divUrlResults').append(html);
                            }
                        }
                        $('#progressInfo').html('complete.');
                        $('#divProg').css("width", "100%");
                    },
                    error: function () {
                        $('#progressInfo').html('woops.  error.');
                        $('#divProg').css("width", "66%");
                        $('#divUrlResults').append("<p>there was a problem with the data returned.  please try again, or try a different search</p>");
                    }
                });
            }
            else {
                $('#progressInfo').html('no results.');
                $('#divProg').css("width", "100%");
                $('#divUrlResults').append("<p>couldn't find any url results for that twitter search.</p>");
            }
        },
        error: function () {
            $('#progressInfo').html('woops.  error.');
            $('#divProg').css("width", "100%");
            $('#divUrlResults').append("<p>there was a problem with the data returned.  please try again, or try a different search</p>");
        }
    });
}