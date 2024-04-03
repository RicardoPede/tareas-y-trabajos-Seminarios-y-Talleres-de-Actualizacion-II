    async function generateInputs() {
        console.log('Generar campos de entrada para las matrices');
        // Obtén el número de filas y columnas de los campos de entrada
        const rows = document.getElementById('rows').value;
        const cols = document.getElementById('cols').value;
        // Obtén el elemento en el que quieres insertar los campos de entrada
        const container = document.getElementById('inputs');
        // Limpia cualquier contenido anterior
        container.innerHTML = '';

        // Crea los campos de entrada
        ['matrix1', 'matrix2'].forEach((matrix, index) => {
            // Crea un encabezado para la matriz
            const header = document.createElement('h3');
            header.textContent = `Matriz ${index + 1}`;
            container.appendChild(header);

            // Crea los campos de entrada para la matriz
            createInputFields(container, rows, cols);
        });
    }

    function createInputFields(container, rows, cols) {

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                // Crea un nuevo campo de entrada
                const input = document.createElement('input');
                input.type = 'number';
                input.style.width = '100px';
                input.name = 'matrix';
                input.id = `input-${i}-${j}`;
                // Añade el campo de entrada al contenedor
                container.appendChild(input);
            }
            // Añade un salto de línea después de cada fila
            container.appendChild(document.createElement('br'));
        }
    }

    async function sumMatrices() {
        console.log('Sumar matrices');
        const matrix1 = getMatrixValues('matrix1');
        const matrix2 = getMatrixValues('matrix2');
        try {
            console.log('Mostrar Suma de matrices');
            console.log('matrix1', matrix1);
            console.log('matrix2', matrix2);
            const response = await fetch('/sum', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ matrix1, matrix2 }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const resultMatrix = data.result;

            // Crea una nueva matriz en el DOM con los resultados
            const resultContainer = document.getElementById('result');
            resultContainer.innerHTML = '';  // Limpia el contenedor de resultados
            for (let i = 0; i < resultMatrix.length; i++) {
                for (let j = 0; j < resultMatrix[i].length; j++) {
                    const number = document.createElement('span');
                    number.textContent = resultMatrix[i][j];
                    resultContainer.appendChild(number);
                }
                resultContainer.appendChild(document.createElement('br'));  // Añade un salto de línea después de cada fila
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function getMatrixValues(containerId) {
        // Obtén el contenedor de la matriz
        const container = document.getElementById(containerId);
    
        // Obtén todos los campos de entrada en el contenedor
        const inputs = container.getElementsByTagName('inputs');
    
        // Crea una matriz con los valores de los campos de entrada
        const matrix = [];
        for (let i = 0; i < inputs.length; i++) {
            matrix.push(Number(inputs[i].value));
        }
    
        return matrix;
    }