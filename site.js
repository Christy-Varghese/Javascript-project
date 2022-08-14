const clearBtn = document.getElementById('clear-btn');
const textInput = document.getElementById('text-input');
let spreadsheetTable = null;
let selectedCell = null;
let cellsWithValue = {};

// Function to generate a spreadsheet table
const genSpreadSheetTable = () => {
    const columnTitles = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    const tableElement = document.createElement('table');
    tableElement.id = 'spreadsheet-table';
    let rowsHTML = '';
    const rowsCount = columnTitles.length + 1;
    for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
        rowsHTML += '<tr>';
        for (let columnIndex = 0; columnIndex < columnTitles.length + 1; columnIndex++) {
            let cellText = '';
            let cellID = '';
            if (!rowIndex) {
                cellText = columnIndex ? columnTitles[columnIndex - 1].toUpperCase() : '';
            } else {
                cellText = !columnIndex ? rowIndex : '';
                cellID = !!columnIndex ? `${columnTitles[columnIndex - 1]}-${rowIndex}` : '';
            }
            rowsHTML += `<td id="${cellID}">${cellText}</td>`;
        }
        rowsHTML += '</tr>';
    }
    const tableBodyHTML = `
  <tbody>
    ${rowsHTML}
  </tbody>`;
    tableElement.innerHTML = tableBodyHTML;
    document.body.appendChild(tableElement);

    return tableElement;
};

const getCellByID = (cellID) => {
    if (!cellID) {
        return null;
    }
    return cellsWithValue[cellID.toLowerCase()];
};

const updateCellsWithValue = () => {
    if (!!Object.keys(cellsWithValue).length) {
        Object.keys(cellsWithValue).forEach((cellID) => {
            const cell = document.getElementById(cellID);
            const cellWithValue = cellsWithValue[cellID];
            let value = cellWithValue.value;

            if (cellWithValue.type === 'formula') {
                // Recalculate cells of formula type in case any associated cell is updated
                const cellIDs = extractCellIDsOfFormular(cellWithValue.text);
                if (!!cellIDs) {
                    const cell1 = getCellByID(cellIDs[0]);
                    const cell2 = getCellByID(cellIDs[1]);
                    if (cell1 && cell2) {
                        value = cell1.value + cell2.value;
                    }
                }
            }

            cellWithValue.value = value;
            cell.innerText = value;
        });
    }
};

const updateTextInput = (cell) => {
    if (!cell) {
        return;
    }

    const cellWithValue = cellsWithValue[cell.id];
    textInput.value = cellWithValue ? cellWithValue.text : '';
};

const clearSelectedCell = () => {
    if (!!selectedCell) {
        selectedCell.classList.remove('selected');
        selectedCell = null;
    }
};

const clearTextInput = () => {
    textInput.value = '';
    textInput.blur();
};

const selectCell = (e) => {
    const target = e.target;
    if (target.tagName !== 'TD' || !target.id) {
        return;
    }

    if (selectedCell) {
        selectedCell.classList.remove('selected');
    }

    selectedCell = target;
    selectedCell.classList.add('selected');

    updateTextInput(selectedCell);
};

const extractCellIDsOfFormular = (formula) => {
    const regex = new RegExp(/=\s*([a-j]{1})(\d{1,2})\s*\+\s*([a-j]{1})(\d{1,2})\s*/, 'i');
    const matches = formula.match(regex);
    if (!matches) {
        return null;
    }

    return [`${matches[1]}-${matches[2]}`, `${matches[3]}-${matches[4]}`];
};

clearBtn.addEventListener('click', () => {
    // Clear cells with value
    if (!!Object.keys(cellsWithValue).length) {
        Object.keys(cellsWithValue).forEach((cellID) => {
            const cell = document.getElementById(cellID);
            if (cell) {
                cell.classList.remove('selected');
                cell.innerText = '';
            }
        });
        cellsWithValue = {};
    }

    clearSelectedCell();
    clearTextInput();
});

textInput.addEventListener('keyup', (e) => {
    if (e.isComposing || e.keyCode !== 13 || !selectedCell) {
        return;
    }

    let value = textInput.value;
    if (!!value) {
        let type = null;

        if (value.startsWith('=')) {
            // formula
            const formula = value;
            const cellIDs = extractCellIDsOfFormular(formula);
            if (!!cellIDs) {
                const cell1 = getCellByID(cellIDs[0]);
                const cell2 = getCellByID(cellIDs[1]);
                if (cell1 && cell2) {
                    type = 'formula';
                    value = cell1.value + cell2.value;
                    text = formula.toUpperCase();
                }
            }
        } else {
            // raw data
            type = 'raw';
            value = parseFloat(value);
            text = value;
        }

        if (!!type) {
            const selectedCellID = selectedCell.id;
            cellsWithValue[selectedCellID] = {
                id: selectedCellID,
                type,
                value,
                text,
            };
        }
    }

    updateCellsWithValue();
    clearSelectedCell();
    clearTextInput();
});

window.addEventListener('load', () => {
    spreadsheetTable = genSpreadSheetTable();
    spreadsheetTable.addEventListener('click', selectCell);
});