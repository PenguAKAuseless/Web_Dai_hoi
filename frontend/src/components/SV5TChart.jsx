import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
    {
        level: 'Cấp Trường',
        '2022-2023': 100,
        '2023-2024': 88
    },
    {
        level: 'Cấp DHQG',
        '2022-2023': 95,
        '2023-2024': 74
    },
    {
        level: 'Cấp Thành',
        '2022-2023': 43,
        '2023-2024': 75
    },
    {
        level: 'Cấp TW',
        '2022-2023': 11,
        '2023-2024': 20
    }
];

export default function SV5TChart() {
    return (
        <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="level" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="2022-2023" fill="#8884d8" />
                    <Bar dataKey="2023-2024" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}