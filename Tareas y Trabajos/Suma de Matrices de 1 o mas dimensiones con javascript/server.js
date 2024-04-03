import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname));

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'matrices.html'));
});

app.post('/sum', (req, res) => {
    console.log('Suma de matrices');
    console.log('req.body', req.body)
    console.log('matrix1', req.body.matrix1);
    console.log('matrix2', req.body.matrix2);
    const matrix1 = req.body.matrix1;
    const matrix2 = req.body.matrix2;
    console.log("matrix", matrix1, matrix2);
    let result = [];
    for (let i = 0; i < matrix1.length; i++) {
        result.push([]);
        for (let j = 0; j < matrix1[i].length; j++) {
            result[i].push(parseInt(matrix1[i][j]) + parseInt(matrix2[i][j]));
        }
    }
    res.json({ result });
}
);

app.listen(5500, () => {
    console.log('Server running on http://localhost:5500');
});
