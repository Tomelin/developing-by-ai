'use client';

import * as React from 'react';
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltipContent, type ChartConfig, ChartContainer } from '@/components/ui/chart';
import { TRANSACTION_CATEGORIES } from '@/lib/constants';

const chartData = [
  { category: 'Food', amount: 450, fill: 'var(--color-food)' },
  { category: 'Transport', amount: 200, fill: 'var(--color-transport)' },
  { category: 'Housing', amount: 1200, fill: 'var(--color-housing)' },
  { category: 'Bills', amount: 300, fill: 'var(--color-bills)' },
  { category: 'Entertainment', amount: 150, fill: 'var(--color-entertainment)' },
  { category: 'Other', amount: 100, fill: 'var(--color-other)' },
];

const chartConfig = {
  amount: {
    label: 'Amount',
  },
  food: { label: 'Food', color: 'hsl(var(--chart-1))' },
  transport: { label: 'Transport', color: 'hsl(var(--chart-2))' },
  housing: { label: 'Housing', color: 'hsl(var(--chart-3))' },
  bills: { label: 'Bills', color: 'hsl(var(--chart-4))' },
  entertainment: { label: 'Entertainment', color: 'hsl(var(--chart-5))' },
  other: { label: 'Other', color: 'hsl(var(--muted))' }, // Using muted as a fallback for 6th color
} satisfies ChartConfig;


export function ExpenseBreakdownChart() {
  const id = React.useId()
  return (
     <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[300px]"
      >
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <ChartTooltipContent
            nameKey="category"
            formatter={(value, name) => `${chartConfig[name as keyof typeof chartConfig]?.label}: $${Number(value).toLocaleString()}`}
          />
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={100}
            innerRadius={60}
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);
              return (percent * 100) > 5 ? ( // Only show label if percent is > 5%
                <text x={x} y={y} fill="hsl(var(--card-foreground))" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs">
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              ) : null;
            }}
          >
            {chartData.map((entry) => (
              <Cell key={`cell-${entry.category}`} fill={entry.fill} />
            ))}
          </Pie>
           <Legend
            content={({ payload }) => {
              return (
                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 pt-4 text-sm">
                  {payload?.map((entry, index) => (
                     <li key={`item-${index}`} className="flex items-center gap-1.5">
                      <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span>{chartConfig[entry.value as keyof typeof chartConfig]?.label || entry.value}</span>
                    </li>
                  ))}
                </ul>
              )
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
