var sitecolours = {
    primary: '#2196F3',
    secondary: '#CCCCCC',
    success: '#4CAF50',
    info: '#9C27B0',
    warning: '#FF9800',
    danger: '#E51C23'
};

$(function () {
    // $('[data-toggle="popover"]').popover();
    
    // Don't like this much but prefer writing tables in markdown so need to add a standard set of bootstrap classes
    $('table').addClass('table');
    $('blockquote').addClass('blockquote');
});

var hexToRGB = function(hex){
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
};