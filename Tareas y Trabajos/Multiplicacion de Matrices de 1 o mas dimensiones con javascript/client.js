function generateMatrices() {
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;
    const inputs = document.getElementById('inputs');

    let matrices = '';
    for (let m = 1; m <= 2; m++) {
        matrices += `<h2>Matriz ${m}</h2>`;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                matrices += `<input type="number" class="matrix-input" style="width: 100px; margin-right: 10px;" name="matrix" id="matrix${m}_${i}_${j}">`;
            }
            matrices += '<br>';
        }
        matrices += '<br>';
    }
    inputs.innerHTML = matrices;
}

function getMatrixValues(matrixName) {
    const matrix = [];
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;
    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < cols; j++) {
            const input = document.getElementById(`${matrixName}_${i}_${j}`);
            matrix[i][j] = Number(input.value);
        }
    }
    return matrix;
}

function sendMatricesToServer() {
    const matrix1 = getMatrixValues('matrix1');
    console.log('Matrix 1:', matrix1);
    const matrix2 = getMatrixValues('matrix2');
    console.log('Matrix 2:', matrix2);
    fetch('/multiplicar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matrix1, matrix2 }),
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const resultMatrix = data.resultado;
            if (Object.keys(resultMatrix).length > 0) {
                showResult(resultMatrix);
            } else {
                console.error('No se recibió una matriz resultante del servidor');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function multiplyMatrices() {
    sendMatricesToServer();
}

async function showResult(resultMatrix) {
    const result = document.getElementById('result');
    result.innerHTML = '<h2>Resultado</h2>';
    //salto de linea
    result.innerHTML += '<br>';
    let table = '<table class="d-flex justify-content-center align-items-center border">';
    for (let i = 0; i < resultMatrix.length; i++) {
        table += '<tr>';
        for (let j = 0; j < resultMatrix[i].length; j++) {
            table += `<td style="border: 1px solid black; padding: 10px;">${resultMatrix[i][j]}</td>`;
        }
        table += '</tr>';
    }
    table += '</table>';

    result.innerHTML += table;
}

