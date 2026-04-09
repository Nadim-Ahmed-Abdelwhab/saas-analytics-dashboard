"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

export default function UsersChart({ total }: { total: number }) {
  const data = [
    { name: "Jan", users: total * 0.2 },
    { name: "Feb", users: total * 0.4 },
    { name: "Mar", users: total * 0.6 },
    { name: "Apr", users: total * 0.8 },
    { name: "May", users: total },
  ];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />

        <Line
          type="monotone"
          dataKey="users"
          stroke="#6366F1"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
          animationDuration={800}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}