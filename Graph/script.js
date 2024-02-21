document.addEventListener('DOMContentLoaded', function() {
    const ctx = document.getElementById('myChart').getContext('2d');
    fetch('/data')
        .then(response => response.json())
        .then(data => {

            const ageGroups = ["15-19", "20-24", "25-29"];
            const groupedData = {};
            ageGroups.forEach(age => {
                groupedData[age] = {};
                data.forEach(item => {
                    if (item.Value === age) {
                        groupedData[age][item.Category] = item.Proportion;
                    }
                });
            });

            const categories = [...new Set(data.map(item => item.Category))];
            

            const datasets = categories.map(category => {
                return {
                    label: category,
                    data: ageGroups.map(age => groupedData[age][category] ),
                    backgroundColor: getRandomColor(), 
                    borderColor: 'rgba(0, 0, 0, 0.5)',
                    borderWidth: 1
                };
            });

            const chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: ageGroups,
                    datasets: datasets
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'HIV Perception by the Youth'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Percentage'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Age Group'
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
