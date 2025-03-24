import React, { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const CustomPieChart = ({ attendedCount, notAttendedCount }) => {
    // Track initial animation completion
    const [initialAnimationComplete, setInitialAnimationComplete] = useState(false);
    const isFirstRender = useRef(true);
    const animationTimerRef = useRef(null);

    // Animation duration in milliseconds - shorter for better UX
    const initialAnimationDuration = 3000;
    const updateAnimationDuration = 300;

    // Current values for immediate label updates
    const [currentValues, setCurrentValues] = useState({
        attended: attendedCount,
        notAttended: notAttendedCount
    });

    // Update current values immediately when props change
    useEffect(() => {
        setCurrentValues({
            attended: attendedCount,
            notAttended: notAttendedCount
        });
    }, [attendedCount, notAttendedCount]);

    // Data for the pie chart
    const pieData = [
        { name: "ĐÃ THAM DỰ", value: attendedCount, color: "#4472c4" },
        { name: "CHƯA THAM DỰ", value: notAttendedCount, color: "#ed7d31" }
    ];

    // Handle the initial animation when component mounts
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;

            // Clear any existing timers
            if (animationTimerRef.current) {
                clearTimeout(animationTimerRef.current);
            }

            // Set timer to mark initial animation as complete
            animationTimerRef.current = setTimeout(() => {
                setInitialAnimationComplete(true);
            }, initialAnimationDuration + 50);
        }

        return () => {
            if (animationTimerRef.current) {
                clearTimeout(animationTimerRef.current);
            }
        };
    }, []);

    // Custom label rendering function with immediate updates
    const renderCustomizedLabel = (props) => {
        const { cx, cy, midAngle, innerRadius, outerRadius, index } = props;

        // Get the current data entry
        const entry = pieData[index];
        if (!entry || entry.value === 0) return null;

        // Calculate the position for the text
        // Moved labels further out to make them more visible with the larger chart
        const radius = outerRadius * 0.75;
        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

        // Use the current values for immediate updates
        const value = entry.name === "ĐÃ THAM DỰ"
            ? currentValues.attended
            : currentValues.notAttended;

        // Only show labels after initial animation completes
        if (!initialAnimationComplete && isFirstRender.current) return null;

        return (
            <text
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#fff"
                style={{
                    fontFamily: 'Montserrat, sans-serif',
                    fontWeight: 'bold',
                    fontSize: '36px',  // Increased font size
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
            >
                {value}
            </text>
        );
    };

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="45%"  // Increased inner radius
                    outerRadius="95%"  // Increased outer radius for larger chart
                    dataKey="value"
                    startAngle={90}
                    endAngle={-270}
                    labelLine={false}
                    label={renderCustomizedLabel}
                    animationDuration={initialAnimationComplete ? updateAnimationDuration : initialAnimationDuration}
                    animationBegin={0}
                    isAnimationActive={true}
                >
                    {pieData.map((entry) => (
                        <Cell
                            key={`cell-${entry.name}`}
                            fill={entry.color}
                        />
                    ))}
                </Pie>
                
                {/* Center Logo */}
                <image
                    href="./logo.png"
                    x="30%"
                    y="30%"
                    height="40%"
                    width="40%"
                    preserveAspectRatio="xMidYMid meet"
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default CustomPieChart;