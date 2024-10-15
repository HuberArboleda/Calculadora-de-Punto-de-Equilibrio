let myChart = null; // Global para evitar duplicación

function calcular() {
    // Obtener los valores de los campos del formulario
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    const costoVariable = parseFloat(document.getElementById('costos_variables').value);
    const costoFijo = parseFloat(document.getElementById('costos_fijos').value);

    // Verificar si todos los campos tienen valores válidos
    if (isNaN(ingreso) || isNaN(costoVariable) || isNaN(costoFijo)) {
        document.getElementById('resultado').textContent = ''; // Limpiar el resultado si hay entradas inválidas
        return;
    }

    if (ingreso <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese un ingreso positivo.';
        return;
    }
    if (costoVariable <= 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese un costo variable positivo.';
        return;
    }
    if (costoFijo < 0) {
        document.getElementById('resultado').textContent = 'Por favor, ingrese un costo fijo no negativo.';
        return;
    }

    const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
    const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

    const unidades = [];
    const costosTotales = [];
    const ingresosTotales = [];
    const maxUnidades = Math.ceil(puntoEquilibrioUnidades) * 2;

    // Limpiar cualquier gráfico previo antes de crear uno nuevo
    if (myChart instanceof Chart) {
        myChart.destroy();
        myChart = null;
    }

    let i = 0;

    // Función para generar los datos del gráfico en partes pequeñas
    function generarDatos() {
        const chunkSize = 100; // Tamaño del bloque
        if (i <= maxUnidades) {
            for (let j = 0; j < chunkSize && i <= maxUnidades; j++) {
                unidades.push(i);
                costosTotales.push(costoFijo + (costoVariable * i));
                ingresosTotales.push(ingreso * i);
                i++;
            }
    
            // Usar setTimeout para pausar y permitir que el navegador procese otras tareas
            setTimeout(generarDatos, 0);
        } else {
            // Cuando todos los datos están generados, crear el gráfico
            crearGrafico();
        }
    }

    // Iniciar el proceso de generación de datos
    generarDatos();

    function crearGrafico() {
        const ctx = document.getElementById('myChart').getContext('2d');

        myChart = new Chart(ctx, {
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
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const button = document.querySelector('.dark-mode-toggle');
    button.textContent = document.body.classList.contains('dark-mode') ? '🌙' : '☀️';
}

