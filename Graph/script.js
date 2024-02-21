document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    fetch('/data')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.label);
            const datasetData = data.map(item => item.value);
            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sample Data',
                        data: datasetData,
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
        })
        .catch(error => console.error('Error fetching data:', error));
});

