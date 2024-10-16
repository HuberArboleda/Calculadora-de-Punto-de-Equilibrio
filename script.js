// script.js

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

function calcular() {
  // Obtener los valores de los campos del formulario
  const ingreso = parseFloat(document.getElementById("ingreso").value);
  // ... otros valores

  // Validar los datos
  if (isNaN(ingreso) || ingreso <= 0) {
    alert(
      "Por favor, ingrese un valor numérico positivo para el ingreso por unidad."
    );
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
  document.getElementById(
    "resultado"
  ).textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(
    2
  )} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

  // Crear el gráfico
  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    // Configuración del gráfico
  });
}

function LimpiarForm() {
  document.getElementById("ingreso").value = "";
  document.getElementById("materiales").value = "";
  document.getElementById("costoFijo").value = "";

  document.getElementById('ingresoError').textContent = '';
  document.getElementById('ingresoError').classList.add('hidden');
  document.getElementById('materialesError').textContent = '';
  document.getElementById('materialesError').classList.add('hidden');
  document.getElementById('costoFijoError').textContent = '';
  document.getElementById('costoFijoError').classList.add('hidden');
}
