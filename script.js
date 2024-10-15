// script.js
function calcular() {
    // Obtener los valores de los campos del formulario
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const costoVariable = parseFloat(document.getElementById('costos_variables').value);
    const costoFijo = parseFloat(document.getElementById('costos_fijos').value);
    // ... otros valores

    // Verificar si todos los campos tienen valores válidos
    if (isNaN(ingreso) || isNaN(costoVariable) || isNaN(costoFijo)) {
        document.getElementById('resultado').textContent = ''; // Limpiar el resultado si hay entradas inválidas
        return;
    }

    if (ingreso <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese un ingreso positivo.'; // Mensaje en lugar de alerta
        return;
    }
    if (costoVariable <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese un costo variable positivo.'; // Mensaje en lugar de alerta
        return;
    }
    if (costoFijo < 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese un costo fijo no negativo.'; // Mensaje en lugar de alerta
        return;
    }
    // ... otras validaciones

    // Calcular el punto de equilibrio
    //const costoVariable = ...;
    //const costoFijo = ...;
    const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
    const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

    // Crear los datos del gráfico
    const unidades = [];
    const costosTotales = [];
    const ingresosTotales = [];
    const maxUnidades = Math.ceil(puntoEquilibrioUnidades) * 2;

    for (let i = 0; i <= maxUnidades; i++) {
        unidades.push(i);
        costosTotales.push(costoFijo + (costoVariable * i));
        ingresosTotales.push(ingreso * i);
    }


    // Crear el gráfico
    const ctx = document.getElementById('myChart').getContext('2d');

    // Limpiar cualquier gráfico previo antes de crear uno nuevo
    if (window.myChart instanceof Chart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        // Configuración del gráfico
        type: 'line',
        data: {
            labels: unidades,
            datasets: [
                {
                    label: 'Costos Totales',
                    data: costosTotales,
                    borderColor: 'red',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Ingresos Totales',
                    data: ingresosTotales,
                    borderColor: 'green',
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: 'Costos Fijos',
                    data: Array(unidades.length).fill(costoFijo),
                    borderColor: 'blue',
                    borderWidth: 2,
                    borderDash: [5, 5],
                    fill: false
                },
                {
                    label: 'Punto de Equilibrio',
                    data: [{ x: puntoEquilibrioUnidades, y: costoFijo + (costoVariable * puntoEquilibrioUnidades) }],
                    borderColor: 'black',
                    borderWidth: 2,
                    pointRadius: 10,
                    pointBackgroundColor: 'black',
                    fill: false,
                    showLine: false
                }
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Gráfico de Punto de Equilibrio'
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Cantidad de unidades'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Costos/Ingresos'
                    }
                }
            }
        }
    });
}