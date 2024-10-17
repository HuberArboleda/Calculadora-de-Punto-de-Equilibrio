const ingresoInput = document.getElementById('ingreso');
const costoVariableInput = document.getElementById('costoVariable');
const costoFijoInput = document.getElementById('costoFijo');
const unidadesOutput = document.getElementById('unidades');
const valorOutput = document.getElementById('valor');
const ctx = document.getElementById('myChart').getContext('2d');

let chart;

function calcular() {
    const ingreso = parseFloat(ingresoInput.value) || 0;
    const costoVariable = parseFloat(costoVariableInput.value) || 0;
    const costoFijo = parseFloat(costoFijoInput.value) || 0;

    if (ingreso > costoVariable) {
        const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
        const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;

        unidadesOutput.textContent = puntoEquilibrioUnidades.toFixed(2);
        valorOutput.textContent = puntoEquilibrioValor.toFixed(2);

        actualizarGrafico(puntoEquilibrioUnidades, puntoEquilibrioValor);
    } else {
        unidadesOutput.textContent = '0';
        valorOutput.textContent = '0';
        actualizarGrafico(0, 0);
    }
}

// Función para actualizar el gráfico
function actualizarGrafico(unidades, valor) {
    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Unidades', 'Valor Monetario'],
            datasets: [{
                label: 'Punto de Equilibrio',
                data: [unidades, valor],
                backgroundColor: ['#4CAF50', '#2196F3']
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// Escuchar cambios en los inputs y calcular automáticamente
[ingresoInput, costoVariableInput, costoFijoInput].forEach(input =>
    input.addEventListener('input', calcular)
);
