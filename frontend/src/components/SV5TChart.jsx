import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts"

const data = [
    {
        level: "Cấp Trường",
        "2022-2023": 100,
        "2023-2024": 88,
    },
    {
        level: "Cấp DHQG",
        "2022-2023": 95,
        "2023-2024": 74,
    },
    {
        level: "Cấp Thành",
        "2022-2023": 43,
        "2023-2024": 75,
    },
    {
        level: "Cấp TW",
        "2022-2023": 11,
        "2023-2024": 20,
    },
]

export default function SV5TChart() {
    return (
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
                <YAxis domain={[0, 125]} ticks={[0, 25, 50, 75, 100, 125]} />
                <Tooltip />
                <Legend
                    wrapperStyle={{
                        fontSize: "20px", // Increase font size
                        fontWeight: "bold", // Make it bold
                    }}
                />
                <Bar dataKey="2022-2023" fill="#ed7d31">
                    <LabelList
                        dataKey="2022-2023"
                        position="top"
                        className="text-black text-xl font-black font-[Montserrat,sans-serif]"
                    />
                </Bar>
                <Bar dataKey="2023-2024" fill="#4472c4">
                    <LabelList
                        dataKey="2023-2024"
                        position="top"
                        className="text-black text-xl font-black font-[Montserrat,sans-serif]"
                    />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

