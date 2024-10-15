
const unitPriceInput = document.getElementById('unitPrice');
const variableCostInput = document.getElementById('variableCost');
const fixedCostsInput = document.getElementById('fixedCosts');
const breakEvenUnitsSpan = document.getElementById('breakEvenUnits');
const breakEvenRevenueSpan = document.getElementById('breakEvenRevenue');
const chartCanvas = document.getElementById('breakEvenChart');

let chart = null;

[unitPriceInput, variableCostInput, fixedCostsInput].forEach(input => {
    input.addEventListener('input', calculateBreakEven);
});

function calculateBreakEven() {
    const unitPrice = parseFloat(unitPriceInput.value) || 0;
    const variableCost = parseFloat(variableCostInput.value) || 0;
    const fixedCosts = parseFloat(fixedCostsInput.value) || 0;

    const contributionMargin = unitPrice - variableCost;
    
    if (contributionMargin > 0) {
        const breakEvenUnits = fixedCosts / contributionMargin;
        const breakEvenRevenue = breakEvenUnits * unitPrice;

        breakEvenUnitsSpan.textContent = Math.ceil(breakEvenUnits).toLocaleString();
        breakEvenRevenueSpan.textContent = Math.ceil(breakEvenRevenue).toLocaleString();

        updateChart(breakEvenUnits, unitPrice, variableCost, fixedCosts);
    } else {
        breakEvenUnitsSpan.textContent = 'N/A';
        breakEvenRevenueSpan.textContent = 'N/A';
        if (chart) {
            chart.destroy();
            chart = null;
        }
    }
}

function updateChart(breakEvenUnits, unitPrice, variableCost, fixedCosts) {
    const units = Array.from({ length: 20 }, (_, i) => Math.ceil(breakEvenUnits * (i + 1) / 10));
    const totalRevenue = units.map(u => u * unitPrice);
    const totalCosts = units.map(u => fixedCosts + u * variableCost);

    if (chart) {
        chart.data.labels = units;
        chart.data.datasets[0].data = totalRevenue;
        chart.data.datasets[1].data = totalCosts;
        chart.update();
    } else {
        chart = new Chart(chartCanvas, {
            type: 'line',
            data: {
                labels: units,
                datasets: [
                    {
                        label: 'Ingresos Totales',
                        data: totalRevenue,
                        borderColor: 'rgb(75, 192, 192)',
                        tension: 0.1
                    },
                    {
                        label: 'Costos Totales',
                        data: totalCosts,
                        borderColor: 'rgb(255, 99, 132)',
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Análisis del Punto de Equilibrio'
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Unidades'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Monto ($)'
                        }
                    }
                }
            }
        });
    }
}

calculateBreakEven();
