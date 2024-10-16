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

  const ingresoInput = document.getElementById("ingreso");
  const materialesInput = document.getElementById("materiales");
  const costoFijoInput = document.getElementById("costoFijo");

  ingresoInput.addEventListener("input", actualizarCalculos);
  materialesInput.addEventListener("input", actualizarCalculos);
  costoFijoInput.addEventListener("input", actualizarCalculos);

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
}
