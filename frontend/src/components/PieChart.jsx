import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "../styles/PieChart.css";

ChartJS.register(ArcElement, Tooltip, ChartDataLabels);

const PieChart = ({ checkedIn = 0, notCheckedIn = 0 }) => {
    console.log("Checked In:", checkedIn, "Not Checked In:", notCheckedIn);

    const data = {
        labels: ["Checked In", "Not Checked In"],
        datasets: [
            {
                data: [checkedIn, notCheckedIn],
                backgroundColor: ["#4472c4", "#ed7d31"],
                hoverBackgroundColor: ["#5a8ae5", "#f5a35b"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: { enabled: true },
            legend: { display: false },
            datalabels: {
                color: "#000",  // Change to "#000" if background is light
                font: {
                    family: 'Montserrat',
                    weight: "bold",
                    size: 40,
                },
                formatter: (value) => value > 0 ? value : "",
            },
        },
        cutout: "50%",
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <Pie data={data} options={options} />
            </div>
            <div className="legend-container">
                <div className="legend-item">
                    <div className="legend-box" style={{ backgroundColor: "#4472c4" }}></div>
                    Checked In
                </div>
                <div className="legend-item">
                    <div className="legend-box" style={{ backgroundColor: "#f5a35b" }}></div>
                    Not Checked In
                </div>
            </div>
        </div>
    );
};

export default PieChart;