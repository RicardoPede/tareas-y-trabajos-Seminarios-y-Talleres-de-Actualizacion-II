const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.json());

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'matrices.html'));
});

app.post('/sum', (req, res) => {
    let matrix1 = req.body.matrix1;
    let matrix2 = req.body.matrix2;
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
