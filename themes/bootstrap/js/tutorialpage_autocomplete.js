$(function () { // only begin once page has loaded
    $("#txt-search").autocomplete({ // attach auto-complete functionality to textbox
        // define source of the data
        source: function (request, response) {
            // url link to google books, including text entered by user (request.term)
            var booksUrl = "https://www.googleapis.com/books/v1/volumes?printType=books&q=" + encodeURIComponent(request.term);
            $.ajax({
                url: booksUrl,
                dataType: "jsonp",
                success: function (data) {
                    response($.map(data.items, function (item) {
                        if (item.volumeInfo.authors && item.volumeInfo.title && item.volumeInfo.industryIdentifiers && item.volumeInfo.publishedDate) {
                            return {
                                // label value will be shown in the suggestions
                                label: item.volumeInfo.title + ', ' + item.volumeInfo.authors[0] + ', ' + item.volumeInfo.publishedDate,
                                // value is what gets put in the textbox once an item selected
                                value: item.volumeInfo.title,
                                // other individual values to use later
                                title: item.volumeInfo.title,
                                author: item.volumeInfo.authors[0],
                                isbn: item.volumeInfo.industryIdentifiers,
                                publishedDate: item.volumeInfo.publishedDate,
                                image: (item.volumeInfo.imageLinks == null ? "" : item.volumeInfo.imageLinks.thumbnail),
                                description: item.volumeInfo.description,
                            };
                        }
                    }));
                }
            });
        },
        select: function (event, ui) {
            // clear down from previous book.
            $('#div-book div').empty();
            $('#div-description div').empty();
            $('#a-worldCat').addClass('disabled');
            $('#div-book-details').show();
            if (ui.item.image != '') $('#div-book-details #book div').append('<img src="' + ui.item.image + '" style="float: left; padding: 10px;">');
            // and title, author, and year
            $('#div-book-details #book div').append('<h4> ' + ui.item.title + '</h4>');
            $('#div-book-details #book div').append(ui.item.author + '<br>');
            $('#div-book-details #book div').append(ui.item.publishedDate);
            // and the usual description of the book
            $('#div-book-details #description div').text(ui.item.description);
            // and show the link to oclc (if we have an isbn number)
            if (ui.item.isbn && ui.item.isbn[0].identifier) {
                $('#a-worldcat').removeClass('disabled');
                $('#a-worldcat').attr("href", 'http://www.worldcat.org/isbn/' + ui.item.isbn[0].identifier);
                $('#a-openlibrary').removeClass('disabled');
                $('#a-openlibrary').attr("href", 'https://openlibrary.org/isbn/' + ui.item.isbn[0].identifier);
            }
        },
        minLength: 2, // set minimum length of text the user must enter
        open: function () {
            var txt = $('#txt-search');
            var width = txt.outerWidth();
            $('.ui-autocomplete').width(width);
        }
    });
});