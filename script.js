function calcular() {
  // Obtener los valores de los campos del formulario
  const precioVenta = parseFloat(document.getElementById("precio-venta").value);
  const costoProduccion = parseFloat(
    document.getElementById("costo-produccion").value
  );
  const costoFijo = parseFloat(document.getElementById("costo-fijo").value);

  // Validar los datos
  if (isNaN(precioVenta)) {
    return alert("Por favor, ingrese un valor para el precio de venta");
  }
  if (isNaN(costoProduccion)) {
    return alert("Por favor, ingrese un valor para el costo de producción");
  }
  if (isNaN(costoFijo)) {
    return alert("Por favor, ingrese un valor para el costo fijo");
  }

    // Calcular el punto de equilibrio
    const gananciaBruta = precioVenta - costoProduccion;
    if (gananciaBruta <= 0)
      return alert(
        "El costo de producción no debería ser mayor o igual al precio de venta"
      );
  
    const puntoEquilibrioUnidades = Math.round(costoFijo / gananciaBruta);
    const puntoEquilibrioValor = Math.round(
      puntoEquilibrioUnidades * precioVenta
    );

  // Obtener los elementos necesarios del DOM
  const seccionResultado = document.getElementById("resultado");
  const svgIcon = document.getElementById("icon");
  const myChart = document.getElementById("myChart");

  // Hacer scroll hacia el resultado
  seccionResultado.scrollIntoView({ behavior: "smooth" });

  // Ocultar el SVG de carga y mostrar el gráfico
  svgIcon.classList.add("hidden");
  myChart.classList.remove("hidden");

  seccionResultado.innerHTML = `El punto de equilibrio se da con: <strong class="text-violet-900">${puntoEquilibrioUnidades} unidades</strong> y un ingreso total de <strong class="text-violet-950">$${puntoEquilibrioValor}</strong>`;

  // Si existe un gráfico previo lo elimina
  if (window.chartInstance) {
    window.chartInstance.destroy();
  }

  // Crear el gráfico
  const ctx = myChart.getContext("2d");

  // Definir el número de unidades (eje X) basado en el punto de equilibrio
  const maxUnidades = Math.ceil(puntoEquilibrioUnidades * 1.2);
  const minUnidades = 0; // Empezamos desde 0, para mostrar un rango completo.

  // Generar el array de unidades para el eje X (exactamente 20 valores)
  const unidades = Array.from({ length: 20 }, (_, i) => {
    // Distribuir de manera uniforme las unidades entre min y max
    return Math.round(minUnidades + (i * (maxUnidades - minUnidades)) / 19);
  });

  // Datos de Ingresos y Costos Totales
  const ingresos = unidades.map((unidad) => precioVenta * unidad);
  const costos = unidades.map((unidad) => costoFijo + costoProduccion * unidad);

  // Calcular el stepSize para que haya exactamente 20 ticks
  const stepSize = Math.max(Math.ceil((maxUnidades - minUnidades) / 19), 1);

  // Crear el gráfico
  window.chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: unidades,
      datasets: [
        {
          label: "Ingreso Total",
          data: ingresos,
          borderColor: "rgb(226, 88, 245)",
          backgroundColor: "rgba(226, 88, 245, 0.2)",
          fill: false,
          borderWidth: 2,
        },
        {
          label: "Costo Total",
          data: costos,
          borderColor: "rgb(139, 92, 246)",
          backgroundColor: "rgba(139, 92, 246, 0.2)",
          fill: false,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: "Ingresos",
          },
        },
        x: {
          title: {
            display: true,
            text: "Unidades",
          },
          min: minUnidades, // Ajuste dinámico para el valor mínimo
          max: maxUnidades, // Ajuste dinámico para el valor máximo
          ticks: {
            stepSize: stepSize, // Ajuste dinámico del paso de los ticks
          },
        },
      },
    },
  });
}

document.getElementById("toTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
