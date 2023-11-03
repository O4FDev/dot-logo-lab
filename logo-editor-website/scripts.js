
const gridContainer = document.getElementById('grid-container');
const downloadButton = document.getElementById('download');

const pattern = [
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000001000000000000000000',
    '0000001000000000000000000',
    '0000001000000000000000000',
    '0000001000000000000000000',
    '0000001111111111100000000',
    '0000001000000000000000000',
    '0000001000000000000000000',
    '0000001000000000000000000',
    '0000001000011110000000000',
    '0000000000100101000000000',
    '0000000001000100100000000',
    '0000000001000100100000000',
    '0000000001000100100000000',
    '0000000001000100100000000',
    '0000000001000100100000000',
    '0000000000100101100000000',
    '0000000000011100000000000',
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000001111111111100000000',
    '0000000000000000000000000',
    '0000000000001100000000000',
    '0000000000010010000000000',
    '0000000000100001000000000',
    '0000000001000000100000000',
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000000000111110000000000',
    '0000000001000001000000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000001000001000000000',
    '0000000000111110000000000',
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000000000111111000000000',
    '0000000001000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000001000001000000000',
    '0000001111111111100000000',
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000000000111111000000000',
    '0000000001000001000000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000010000000100000000',
    '0000000001000001000000000',
    '0000000000111110000000000',
    '0000000000000000000000000',
    '0000000001000000000000000',
    '0000000001000000000000000',
    '0000000111111111100000000',
    '0000000001000000100000000',
    '0000000001000000100000000',
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000000000000000000000000',
    '0000000000000000000000000'
];

const CELL_SIZE = 10; // Size of the cell in pixels
const PADDING = 2; // Padding around circles

function renderVisualGrid() {
    gridContainer.innerHTML = '';
    const numRows = pattern.length;
    const numCols = pattern[0].length;
    for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'col';
        for (let colIndex = 0; colIndex < numCols; colIndex++) {
            const cell = pattern[rowIndex][colIndex];
            const cellElement = document.createElement('div');
            cellElement.className = `cell ${cell === '1' ? 'on' : ''}`;
            cellElement.addEventListener('click', () => toggleCell(rowIndex, colIndex));
            rowElement.appendChild(cellElement);
        }
        gridContainer.appendChild(rowElement);
    }
}

function createCanvas() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const numRows = pattern.length;
    const numCols = pattern[0].length;

    canvas.width = numCols * (CELL_SIZE + PADDING) + PADDING;
    canvas.height = numRows * (CELL_SIZE + PADDING) + PADDING;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for ( let rowIndex = 0; rowIndex < numRows; rowIndex++ )
    {
        for ( let colIndex = 0; colIndex < numCols; colIndex++ )
        {
            const cell = pattern[rowIndex][colIndex]
            if ( cell === '1' )
            {
                ctx.fillStyle = 'white'
                ctx.beginPath()
                ctx.arc(
                    colIndex * ( CELL_SIZE + PADDING ) + PADDING + CELL_SIZE / 2,
                    ( numRows - 1 - rowIndex ) * ( CELL_SIZE + PADDING ) + PADDING + CELL_SIZE / 2, // Invert y-coordinate here
                    CELL_SIZE / 2,
                    0,
                    Math.PI * 2
                )
                ctx.fill()
            }
        }
    }

    return canvas;
}

function toggleCell(rowIndex, colIndex) {
    const row = pattern[rowIndex].split('');
    row[colIndex] = row[colIndex] === '0' ? '1' : '0';
    pattern[rowIndex] = row.join('');
    renderVisualGrid();
}

function downloadImage() {
    const canvas = createCanvas();
    const imageUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = imageUrl;
    a.download = 'pattern.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

downloadButton.addEventListener('click', downloadImage);

renderVisualGrid();
