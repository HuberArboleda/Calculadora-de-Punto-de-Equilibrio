function calcular() {
    // Obtener los valores de los campos del formulario
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const costoVariable = parseFloat(document.getElementById('costoVariable').value);
    const costoFijo = parseFloat(document.getElementById('costoFijo').value);

    // Validar los datos
    if (isNaN(ingreso) || ingreso <= 0) {
        mostrarError('Ingrese un valor positivo para el ingreso por unidad.');
        return;
    }
    if (isNaN(costoVariable) || costoVariable < 0) {
        mostrarError('Ingrese un valor positivo para el costo variable por unidad.');
        return;
    }
    if (isNaN(costoFijo) || costoFijo < 0) {
        mostrarError('Ingrese un valor positivo para el costo fijo.');
        return;
    }

    // Calcular el punto de equilibrio
    const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
    const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;

    // Mostrar el resultado
    document.getElementById('resultado').textContent = 
        `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

    // Crear el gráfico
    actualizarGrafico(ingreso, costoVariable, costoFijo, puntoEquilibrioUnidades);
}

function mostrarError(mensaje) {
    document.getElementById('resultado').textContent = mensaje;
}

let myChart; // Definir myChart aquí

function actualizarGrafico(ingreso, costoVariable, costoFijo, puntoEquilibrioUnidades) {
    const ctx = document.getElementById('myChart').getContext('2d');
    
    // Si myChart ya está definido, destruirlo
    if (myChart) {
        myChart.destroy();
    }
    
    // Crear un nuevo gráfico
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['0', puntoEquilibrioUnidades.toFixed(2), (puntoEquilibrioUnidades + 10).toFixed(2)],
            datasets: [{
                label: 'Ingreso Total',
                data: [0, ingreso * puntoEquilibrioUnidades, ingreso * (puntoEquilibrioUnidades + 10)],
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }, {
                label: 'Costo Total',
                data: [costoFijo, costoFijo + (costoVariable * puntoEquilibrioUnidades), costoFijo + (costoVariable * (puntoEquilibrioUnidades + 10))],
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Unidades'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Valor ($)'
                    },
                    beginAtZero: true
                }
            }
        }
    });
}
