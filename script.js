// script.js
function calcular() {

    $('input').keyup(function () { //Corre el código cada vez que un input cambia
        // Obtener los valores de los campos del formulario
        const ingreso = parseFloat(document.getElementById('ingreso').value);
        const costoVariable = parseFloat(document.getElementById('variable').value);
        const costoFijo = parseFloat(document.getElementById('fijo').value);

        //Flags para mostrar correctamente los campos no válidos: erring | errvari | errfijo.

        // Validar los datos
        if (isNaN(ingreso) || ingreso <= 0) {
            document.getElementById('err-ingreso').textContent = 'Por favor, ingrese un valor numérico positivo para el ingreso por unidad.';
            erring = true;
        } else {
            document.getElementById('err-ingreso').textContent = '';
            erring = false;
        }

        if (isNaN(costoVariable) || costoVariable <= 0) {
            document.getElementById('err-variable').textContent = 'Por favor, ingrese un valor numérico positivo para el costo variable por unidad.';
            errvari = true;
        } else {
            document.getElementById('err-variable').textContent = '';
            errvari = false;
        }

        if (isNaN(costoFijo) || costoFijo <= 0) {
            document.getElementById('err-fijo').textContent = 'Por favor, ingrese un valor numérico positivo para el costo fijo por unidad.';
            errfijo = true;
        } else {
            document.getElementById('err-fijo').textContent = '';
            errfijo = false;
        }

        if (erring == 1 || errvari == 1 || errfijo == 1) {
            return;
        } else {
            // Calcular el punto de equilibrio
            const puntoEquilibrioUnidades = costoFijo / (ingreso - costoVariable);
            const puntoEquilibrioValor = puntoEquilibrioUnidades * ingreso;

            // Mostrar el resultado
            document.getElementById('res-card').className = 'card text-center border-warning'
            document.getElementById('resultado').textContent = `El punto de equilibrio es de ${puntoEquilibrioUnidades.toFixed(2)} unidades o $${puntoEquilibrioValor.toFixed(2)}`;

            //Se crean 2 arrays con los datos para cada linea del gráfico
            let updatedData1 = [0,(ingreso * puntoEquilibrioUnidades),ingreso*puntoEquilibrioUnidades*2];
            let updatedData2 = [(costoFijo + costoVariable * 0),(costoFijo + costoVariable * puntoEquilibrioUnidades),(costoFijo + costoVariable * puntoEquilibrioUnidades*2)];
            //Actualizar valores de las lineas
            myChart.data.datasets[0].data = updatedData1;
            myChart.data.datasets[1].data = updatedData2;
            //Actualizar gráfico
            myChart.update();

        }
    });


}


