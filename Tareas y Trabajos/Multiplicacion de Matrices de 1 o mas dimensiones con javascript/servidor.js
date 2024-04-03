import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.static(__dirname));

app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/matrices.html');
});

app.post('/multiplicar', async (req, res) => {
    const { matrix1, matrix2 } = req.body;
    console.log('Matrix1:', matrix1);
    console.log('Matrix2:', matrix2);
    const resultado = await multiplicarMatrices(matrix1, matrix2);
    console.log('Resultado:', resultado);
    res.json({ resultado });
});

async function multiplicarMatrices(matrix1, matrix2) {
    if (!matrix1 || !matrix2) {
        throw new Error('Las matrices no pueden ser undefined');
    }
    const matrix1Filas = matrix1.length;
    const matrix1Columnas = matrix1[0] ? matrix1[0].length : 0;
    const matrix2Filas = matrix2.length;
    const matrix2Columnas = matrix2[0] ? matrix2[0].length : 0;
    if (matrix1Columnas !== matrix2Filas) {
        throw new Error('No se pueden multiplicar las matrices');
    }
    const resultado = [];
    for (let i = 0; i < matrix1Filas; i++) {
        resultado[i] = [];
        for (let j = 0; j < matrix2Columnas; j++) {
            resultado[i][j] = 0;
            for (let k = 0; k < matrix1Columnas; k++) {
                resultado[i][j] += matrix1[i][k] * matrix2[k][j];
            }
        }
    }
    console.log('Resultado:', resultado);
    return resultado;
}

app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});