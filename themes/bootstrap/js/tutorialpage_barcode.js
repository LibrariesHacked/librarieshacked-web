////////////////////////////////////////////////////////////////////////////
// Script: tutorialpage_barcode.js
// Page: 
// Description: 
////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Function: getBarcode
///////////////////////////////////////////////////////////
var getBarcode = function(accountNumber) {
    $('#demo').barcode(
        accountNumber, // Value barcode (dependent on the type of barcode)
        'code39'
    );
};

///////////////////////////////////////////////////////////
// On Load
///////////////////////////////////////////////////////////
$(function(){
    // Attach to the relevant page control
    $('#btncreatebarcode').on('click', function(e){ getBarcode($('#txtaccountnumber').val()); });
});