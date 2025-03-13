import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ checkedIn, total }) => {
    if (isNaN(checkedIn) || isNaN(total) || total === 0) {
        return <div style={{ textAlign: 'center', fontSize: '18px', fontWeight: 'bold', color: 'gray' }}>No data available</div>;
    }

    const maxCheckedIn = Math.min(checkedIn, 999);
    const remaining = Math.max(0, total - maxCheckedIn);

    const data = {
        labels: ['Checked In', 'Not Checked In'],
        datasets: [
            {
                data: [maxCheckedIn, remaining],
                backgroundColor: ['#ed7d31', '#4472c4'],
                hoverBackgroundColor: ['#f09145', '#5a86d6'],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: {
                enabled: true,
                callbacks: {
                    label: (tooltipItem) => `${tooltipItem.raw} Delegates`
                }
            },
            legend: {
                display: false,
            },
        },
        cutout: '70%',
    };

    return (
        <div style={{ position: 'relative', width: '300px', height: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Pie data={data} options={options} />
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    fontSize: '24px',
                    fontWeight: 'bold',
                }}
            >
                {maxCheckedIn}
            </div>
        </div>
    );
};

export default PieChart;