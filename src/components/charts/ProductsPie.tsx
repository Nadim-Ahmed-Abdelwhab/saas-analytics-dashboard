"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ProductsPie({ products }: any) {
  const categoriesMap: any = {};

  products?.forEach((p: any) => {
    categoriesMap[p.category] = (categoriesMap[p.category] || 0) + 1;
  });

  const data = Object.keys(categoriesMap).map((key) => ({
    name: key,
    value: categoriesMap[key],
  }));

  const COLORS = ["#6366F1", "#22C55E", "#F59E0B", "#EF4444", "#3B82F6"];

  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={90}
          label
        >
          {data.map((_: any, index: number) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}