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
        'code39', // type (string)
        {
            barWidth: 1,
            barHeight: 60,
            moduleSize: 5,
            showHRI: true,
            addQuietZone: true,
            marginHRI: 5,
            bgColor: '#FFFFFF',
            color: '#000000',
            fontSize: 10,
            output: 'bmp',
            posX: 0,
            posY: 0
        }
    );
};

///////////////////////////////////////////////////////////
// On Load
///////////////////////////////////////////////////////////
$(function(){
    // Attach to the relevant page control
    $('#').on('click', function(e){ getBarcode(); });
});