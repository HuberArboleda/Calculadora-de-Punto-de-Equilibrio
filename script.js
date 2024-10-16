// script.js
let myChart;

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("ingreso").focus();

  document.getElementById("ingreso").addEventListener("input", function () {
    validarInput(this, "ingresoError");
  });

  document.getElementById("materiales").addEventListener("input", function () {
    validarInput(this, "materialesError");
  });

  document.getElementById("costoFijo").addEventListener("input", function () {
    validarInput(this, "costoFijoError");
  });

  const ingresoInput = document.getElementById("ingreso");
  const materialesInput = document.getElementById("materiales");
  const costoFijoInput = document.getElementById("costoFijo");

  ingresoInput.addEventListener("input", actualizarCalculos);
  materialesInput.addEventListener("input", actualizarCalculos);
  costoFijoInput.addEventListener("input", actualizarCalculos);

  

    function crearGrafico(cantidadMensual, valorMensual, cantidadDiaria, valorDiario) {
        const ctx = document.getElementById('myChart').getContext('2d');
        
        if (myChart) {
            myChart.destroy();
        }

        myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Cantidad Mensual', 'Valor Mensual', 'Cantidad Diaria', 'Valor Diario'],
                datasets: [{
                    label: 'Datos para punto de equilibrio',
                    data: [cantidadMensual, valorMensual, cantidadDiaria, valorDiario],
                    backgroundColor: [
                        'yellow',  
                        'blue',    
                        'red',     
                        'green'   
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

  function actualizarCalculos() {
    const ingreso = parseFloat(ingresoInput.value) || 0;
    const costoMateriales = parseFloat(materialesInput.value) || 0;
    const costoFijo = parseFloat(costoFijoInput.value) || 0;

    let cantidadMensual = 0;
    if (ingreso - costoMateriales > 0) {
      cantidadMensual = costoFijo / (ingreso - costoMateriales);
    }

    const valorMensual = cantidadMensual * ingreso;

    const cantidadDiaria = cantidadMensual / 30;

    const valorDiario = cantidadDiaria * ingreso;

    document.getElementById("cantidadMensual").textContent = isFinite(
      cantidadMensual
    )
      ? cantidadMensual.toFixed(2)
      : "N/A";
    document.getElementById("valorMensual").textContent = isFinite(valorMensual)
      ? valorMensual.toFixed(2)
      : "N/A";
    document.getElementById("cantidadDiaria").textContent = isFinite(
      cantidadDiaria
    )
      ? cantidadDiaria.toFixed(2)
      : "N/A";
    document.getElementById("valorDiario").textContent = isFinite(valorDiario)
      ? valorDiario.toFixed(2)
      : "N/A";

      crearGrafico(cantidadMensual, valorMensual, cantidadDiaria, valorDiario);
  }
});

function validarInput(input, errorId) {
  const errorMsg = document.getElementById(errorId);
  const valor = parseFloat(input.value);

  if (valor < 0) {
    errorMsg.textContent = "El valor no puede ser negativo";
    errorMsg.classList.remove("hidden");
  } else if (valor === 0) {
    errorMsg.textContent = "El valor debe ser mayor a cero";
    errorMsg.classList.remove("hidden");
  } else {
    errorMsg.textContent = "";
    errorMsg.classList.add("hidden");
  }
}

function LimpiarForm() {
    
    document.getElementById("ingreso").value = "";
    document.getElementById("materiales").value = "";
    document.getElementById("costoFijo").value = "";
    
    document.getElementById("ingresoError").textContent = "";
    document.getElementById("ingresoError").classList.add("hidden");
    document.getElementById("materialesError").textContent = "";
    document.getElementById("materialesError").classList.add("hidden");
    document.getElementById("costoFijoError").textContent = "";
    document.getElementById("costoFijoError").classList.add("hidden");
    
    document.getElementById("cantidadMensual").textContent = "0";
    document.getElementById("valorMensual").textContent = "0";
    document.getElementById("cantidadDiaria").textContent = "0";
    document.getElementById("valorDiario").textContent = "0";
    
    if (myChart) {
      myChart.destroy();
    }
}
