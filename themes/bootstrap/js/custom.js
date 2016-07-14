$(function () {
    $('[data-toggle="popover"]').popover();
    // Don't like this much but prefer writing tables in markdown so need to add a standard set of bootstrap classes
    $("table").addClass("table");

});
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date(); a = s.createElement(o),
    m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-51311942-1', 'auto');
ga('send', 'pageview');