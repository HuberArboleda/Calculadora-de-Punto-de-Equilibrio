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
            crearGrafico(unidades, costosTotales, ingresosTotales, puntoEquilibrioUnidades, costoFijo, costoVariable);
        }
    }

    // Iniciar el proceso de generación de datos
    generarDatos();
}

function crearGrafico(unidades, costosTotales, ingresosTotales, puntoEquilibrioUnidades, costoFijo, costoVariable) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Detectar si el modo oscuro está activado
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    // Colores dinámicos basados en el modo
    const textColor = isDarkMode ? '#eaeaea' : '#333';
    const gridColor = isDarkMode ? '#555' : '#ddd';
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: unidades,
            datasets: [
                {
                    label: 'Costos Totales',
                    data: costosTotales,
                    borderColor: 'rgba(255, 99, 132, 1)', // Rojo
                    borderWidth: 2,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fondo rojo transparente
                    fill: true
                },
                {
                    label: 'Ingresos Totales',
                    data: ingresosTotales,
                    borderColor: 'rgba(75, 192, 192, 1)', // Verde
                    borderWidth: 2,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fondo verde transparente
                    fill: true
                },
                {
                    label: 'Costos Fijos',
                    data: Array(unidades.length).fill(costoFijo),
                    borderColor: 'rgba(54, 162, 235, 1)', // Azul
                    borderWidth: 2,
                    borderDash: [5, 5], // Ajuste dinámico del tamaño de los guiones
                    pointStyle: 'rectRot', // Puntos cuadrados inclinados
                    pointRadius: 5, // Aumentar el tamaño de los puntos
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    fill: false
                },
                {
                    label: 'Punto de Equilibrio',
                    data: [{ x: puntoEquilibrioUnidades, y: costoFijo + (costoVariable * puntoEquilibrioUnidades) }],
                    borderColor: 'rgba(0, 0, 0, 1)', // Negro
                    borderWidth: 2,
                    pointRadius: 10,
                    pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                    fill: false,
                    showLine: false
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Gráfico de Punto de Equilibrio',
                    color: textColor, // Cambia el color del texto basado en el modo
                    font: {
                        size: 18
                    }
                },
                legend: {
                    labels: {
                        color: textColor, // Cambia el color del texto de la leyenda
                        font: {
                            size: 14
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Cantidad de unidades',
                        color: textColor, // Cambia el color del título del eje x
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: textColor // Cambia el color de las etiquetas del eje x
                    },
                    grid: {
                        display: true,
                        color: gridColor // Cambia el color de la cuadrícula del eje x
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Costos/Ingresos',
                        color: textColor, // Cambia el color del título del eje y
                        font: {
                            size: 14
                        }
                    },
                    ticks: {
                        color: textColor // Cambia el color de las etiquetas del eje y
                    },
                    grid: {
                        display: true,
                        color: gridColor, // Cambia el color de la cuadrícula del eje y
                        borderDash: [5, 5] // Mantiene el estilo punteado en la cuadrícula
                    }
                }
            }
        }
    });
}

// Función para alternar el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Volver a calcular para recrear el gráfico con los colores y datos correctos
    calcular();
}
