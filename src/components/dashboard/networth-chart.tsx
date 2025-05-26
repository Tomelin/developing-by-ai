'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { ChartTooltipContent, type ChartConfig, ChartContainer } from '@/components/ui/chart';

const chartData = [
  { month: 'Jan', netWorth: 10000 },
  { month: 'Feb', netWorth: 10500 },
  { month: 'Mar', netWorth: 11200 },
  { month: 'Apr', netWorth: 10800 },
  { month: 'May', netWorth: 11500 },
  { month: 'Jun', netWorth: 12000 },
];

const chartConfig = {
  netWorth: {
    label: 'Net Worth',
    color: 'hsl(var(--chart-3))',
  },
} satisfies ChartConfig;

export function NetWorthChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <YAxis 
            tickFormatter={(value) => `$${value / 1000}k`}
            tickLine={false}
            axisLine={false}
            tickMargin={10}
          />
          <ChartTooltipContent 
            cursor={false} 
            formatter={(value) => `$${Number(value).toLocaleString()}`}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="netWorth"
            stroke="var(--color-netWorth)"
            strokeWidth={2}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
