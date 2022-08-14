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
    var sheetTable = document.getElementById("SpreadsheetTable")
    var titleRow = sheetTable.insertRow(-1)
    var cornerCell = titleRow.insertCell(-1)

    // Create header cells
    for (var j = 1; j <= noOfCols; j++) {
        var cellHeader = String.fromCharCode("A".charCodeAt(0) + j - 1)
        console.log(cellHeader)
        titleRow.insertCell(-1).innerHTML = cellHeader
    }

    // Create data cells
    for (var i = 1; i <= noOfRows; i++) {
        var rowTitle = sheetTable.insertRow(-1)
        rowTitle.insertCell(-1).innerHTML = i

        for (var j = 1; j <= noOfCols; j++) {
            var alpha = String.fromCharCode("A".charCodeAt(0) + j - 1)
            rowTitle.insertCell(-1).innerHTML = "<td id='" + alpha + i + "'></td>"
            console.log(alpha + i)
        }
    }
}

// Table created
createSpreadSheet()