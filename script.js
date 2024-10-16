// script.js
function calcular() {
    // Obtener los valores de los campos del formulario
    const ingreso = parseFloat(document.getElementById('ingreso').value);
    // ... otros valores

    // Validar los datos
    if (isNaN(ingreso) || ingreso <= 0) {
        alert('Por favor, ingrese un valor numérico positivo para el ingreso por unidad.');
        return;
    }
    // ... otras validaciones

    // Calcular el punto de equilibrio
    const costoVariable = 0;
    const costoFijo = 0;
    const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
    const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;
    const puntoEquilibrioUnidadesDia = puntoEquilibrioUnidades / 30;
    const puntoEquilibrioValorDia = puntoEquilibrioUnidadesDia * ingreso;

    // Mostrar el resultado
    document.getElementById('resultado').textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

    // Crear el gráfico
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        // Configuración del gráfico
    });
}

function LimpiarForm() {
    document.getElementById('ingreso').value = '';
    document.getElementById('materiales').value = '';
    document.getElementById('costoFijo').value = '';
}