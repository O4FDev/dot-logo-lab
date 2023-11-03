
const gridContainer = document.getElementById( 'grid-container' )
const downloadButton = document.getElementById( 'download' )

const pattern = [
    /* Paste the initial pattern here, e.g. */
    // '0000000000000000000000000',
    // '0000000000000000000000000',
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
    /* ... */
]

function renderGrid ()
{
    gridContainer.innerHTML = ''
    const numRows = pattern.length
    const numCols = pattern[0].length
    for ( let rowIndex = 0; rowIndex < numRows; rowIndex++ )
    {
        const rowElement = document.createElement( 'div' )
        rowElement.className = 'col'
        for ( let colIndex = 0; colIndex < numCols; colIndex++ )
        {
            const cell = pattern[rowIndex][colIndex]
            const cellElement = document.createElement( 'div' )
            cellElement.className = `cell ${ cell === '1' ? 'on' : '' }`
            cellElement.addEventListener( 'click', () => toggleCell( rowIndex, colIndex ) )
            rowElement.appendChild( cellElement )
        }
        gridContainer.appendChild( rowElement )
    }
}

function toggleCell ( rowIndex, colIndex )
{
    const row = pattern[rowIndex].split( '' )
    row[colIndex] = row[colIndex] === '0' ? '1' : '0'
    pattern[rowIndex] = row.join( '' )
    renderGrid()
}

downloadButton.addEventListener( 'click', () =>
{
    const text = pattern.join( '\n' )
    const blob = new Blob( [text], { type: 'text/plain' } )
    const url = URL.createObjectURL( blob )
    const a = document.createElement( 'a' )
    a.href = url
    a.download = 'output.txt'
    a.click()
    URL.revokeObjectURL( url )
} )

renderGrid();
