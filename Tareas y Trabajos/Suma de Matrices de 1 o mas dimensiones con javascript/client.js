document.addEventListener('DOMContentLoaded', function() {
function generateInputs() {
    console.log('Generar campos de entrada para las matrices');
    // Obtén el número de filas y columnas de los campos de entrada
    const rows = document.getElementById('rows').value;
    const cols = document.getElementById('cols').value;

    // Obtén el elemento en el que quieres insertar los campos de entrada
    const container = document.getElementById('inputs');

    // Limpia cualquier contenido anterior
    container.innerHTML = '';

    // Crea los campos de entrada
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            // Crea un nuevo campo de entrada
            const input = document.createElement('input');
            input.type = 'number';
            input.name = 'matrix';
            input.id = `input-${i}-${j}`;

            // Añade el campo de entrada al contenedor
            container.appendChild(input);
        }

        // Añade un salto de línea después de cada fila
        container.appendChild(document.createElement('br'));
    }
}

function sumMatrices() {
    console.log('Sumar matrices');
    // Validar los datos de entrada y enviar al servidor
    let rows = document.getElementById('rows').value;
    let cols = document.getElementById('cols').value;
    let matrix1 = [];
    let matrix2 = [];
    let result = [];
    for (let i = 0; i < rows; i++) {
        matrix1.push([]);
        matrix2.push([]);
        result.push([]);
        for (let j = 0; j < cols; j++) {
            matrix1[i].push(document.getElementById(`input-${i}-${j}`).value);
            matrix2[i].push(document.getElementById(`input-${i}-${j}`).value);
            result[i].push(0);
        }
    }
    fetch('/sum', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matrix1, matrix2 })
    })
    .then(response => response.json())
    .then(data => {
        let resultDiv = document.getElementById('result');
        let resultHTML = '';
        for (let i = 0; i < rows; i++) {
            resultHTML += '<div>';
            for (let j = 0; j < cols; j++) {
                resultHTML += `<span>${data.result[i][j]}</span>`;
            }
            resultHTML += '</div>';
        }
        resultDiv.innerHTML = resultHTML;
    });

}

document.getElementById('generateButton').addEventListener('click', generateInputs);
document.getElementById('sumButton').addEventListener('click', sumMatrices);
});
