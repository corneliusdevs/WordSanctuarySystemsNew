function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('#menu-toggle');
  
    navLinks.classList.toggle('show');
    
    menuToggle.classList.toggle('open');
  }
  

  const ctx = document.getElementById('myPieChart').getContext('2d');

const data = {
    labels: ['Finance', 'Operation', 'Improvement', 'People'], // Four labels
    datasets: [{
        label: 'Votes',
        data: [12, 19, 3, 5],
        backgroundColor: [
            '#4C168D',  
            '#88769F',
            '#442B62', 
            '#0000FF'
        ],
        borderColor: [
            '#4C168D',
            '#88769F',
            '#442B62',
            '#0000FF'     
        ],
        borderWidth: 1
    }]
};

const config = {
    type: 'pie',
    data: data,
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'bottom', 
                labels: {
                    generateLabels: (chart) => {
                        const dataset = chart.data.datasets[0];
                        const total = dataset.data.reduce((acc, value) => acc + value, 0);
                        return chart.data.labels.map((label, i) => {
                            const value = dataset.data[i];
                            const percentage = ((value / total) * 100).toFixed(1);
                            return {
                                text: `${label}`,
                                fillStyle: dataset.backgroundColor[i],
                                strokeStyle: dataset.borderColor[i],
                                lineWidth: 1,
                                hidden: !chart.getDataVisibility(i),
                                index: i,
                            };
                        });
                    }
                }
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const dataset = tooltipItem.dataset;
                        const total = dataset.data.reduce((acc, value) => acc + value, 0);
                        const value = dataset.data[tooltipItem.dataIndex];
                        const percentage = ((value / total) * 100).toFixed(1);
                        return `${tooltipItem.label}: ${percentage}%`;
                    }
                }
            }
        }
    }
};

new Chart(ctx, config);
