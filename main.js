//   Name                : Christy Varghese
//   Student id          : 1082636
//   Fanshawe MailID     : c_varghese161701@fanshaweonline.ca
//   Course Name         : INFO 6122 Programming Javascript
//   Professor           : Sumit Shrestha
//   Date of Submission  : August 14th, 2022
//   Final Project

function init() {
    console.log("The page has loaded");
}

// Rows and Columns - 10*10
const noOfRows = 10;
const noOfCols = 10;



// Dynamically added table
const createSpreadSheet = () => {
    var spreadSheet = document.getElementById("SpreadsheetTable")
    var headerRow = spreadSheet.insertRow(-1)
    var cornerCell = headerRow.insertCell(-1)

    // Create header cells
    for (var j = 1; j <= noOfCols; j++) {
        var cellHeader = String.fromCharCode("A".charCodeAt(0) + j - 1)
        headerRow.insertCell(-1).innerHTML = cellHeader
    }

    // Create data cells
    for (var i = 1; i <= noOfRows; i++) {
        var row = spreadSheet.insertRow(-1)
        row.insertCell(-1).innerHTML = i

        for (var j = 1; j <= noOfCols; j++) {
            var letter = String.fromCharCode("A".charCodeAt(0) + j - 1)
            row.insertCell(-1).innerHTML = "<input id='" + letter + i + "'/>"
        }
    }
}

createSpreadSheet()