document.getElementById('start').addEventListener('click', function () {
    // Crear dos tensores de 10x10 con números aleatorios del 1 al 9
    let tensor1 = tf.randomUniform([10, 10], 1, 9, 'int32');
    let tensor2 = tf.randomUniform([10, 10], 1, 9, 'int32');

    // Calcular y mostrar el tamaño en bytes de los tensores
    let tensor1Bytes = tensor1.size * 4; // 4 bytes por elemento para int32
    let tensor2Bytes = tensor2.size * 4; // 4 bytes por elemento para int32
    document.getElementById('tensor1').innerText = 'Tensor 1: ' + tensor1.toString();
    document.getElementById('tensor1Size').innerText = 'Tamaño: ' + tensor1.size + ' elementos (' + tensor1Bytes + ' bytes)';
    document.getElementById('tensor2').innerText = 'Tensor 2: ' + tensor2.toString();
    document.getElementById('tensor2Size').innerText = 'Tamaño: ' + tensor2.size + ' elementos (' + tensor2Bytes + ' bytes)';

    // Concatenar tensor1 y tensor2 hasta que tensor1 pese más de 64MB
    let i = 0;
    while (tensor1Bytes < 64 * 1024 * 1024) {
        let temp = tensor1;
        tensor1 = tensor1.concat(tensor2); // Concatenar tensor1 y tensor2
        temp.dispose();
        tensor1Bytes = tensor1.size * 10000; // Actualizar el tamaño en bytes de tensor1
        console.log('Iteración ' + i + ': Tensor 1 tamaño = ' + tensor1Bytes + ' bytes');
        i++;
    }

    // Imprimir el tensor resultante y su tamaño en el navegador
    document.getElementById('result').innerText = 'Resultado: ' + tensor1.toString();
    document.getElementById('tensor1FSize').innerText = 'Tamaño después de la concatenación: ' + tensor1.size + ' elementos (' + tensor1Bytes + ' bytes)';

    // Asegurarse de que no queden tensores en memoria al final
    tf.dispose([tensor1, tensor2]);
});
