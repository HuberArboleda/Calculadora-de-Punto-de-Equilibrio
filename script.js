function calcular() {
    // Obtener los valores de los campos del formulario
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const costoVariable = parseFloat(document.getElementById('costoVariable').value);
    const costoFijo = parseFloat(document.getElementById('costoFijo').value);

    // Validar los datos
    if (isNaN(ingreso) || ingreso <= 0 || isNaN(costoVariable) || costoVariable < 0 || isNaN(costoFijo) || costoFijo < 0) {
        alert('Por favor, ingrese valores numéricos positivos.');
        return;
    }

    // Calcular el punto de equilibrio
    const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
    const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

    // Crear el gráfico
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', puntoEquilibrioUnidades.toFixed(2)],
            datasets: [{
                label: 'Punto de Equilibrio',
                data: [0, puntoEquilibrioValor.toFixed(2)],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Unidades'
                    }
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Valor ($)'
                    }
                }
            }
        }
    });
}
