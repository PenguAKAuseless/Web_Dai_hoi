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
                backgroundColor: ["#ed7d31", "#bfbfbf"],
                hoverBackgroundColor: ["#f09145", "#d0d0d0"],
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            tooltip: { enabled: true },
            legend: { display: false },
            datalabels: {
                color: "#fff",  // Change to "#000" if background is light
                font: {
                    weight: "bold",
                    size: 14,
                },
                formatter: (value) => value > 0 ? value : "",
            },
        },
        cutout: "60%",
    };

    return (
        <div className="chart-wrapper">
            <div className="chart-container">
                <Pie data={data} options={options} />
            </div>
            <div className="legend-container">
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: "#ed7d31" }}></span>
                    <span>Checked In ({checkedIn})</span>
                </div>
                <div className="legend-item">
                    <span className="legend-color" style={{ backgroundColor: "#bfbfbf" }}></span>
                    <span>Not Checked In ({notCheckedIn})</span>
                </div>
            </div>
        </div>
    );
};

export default PieChart;