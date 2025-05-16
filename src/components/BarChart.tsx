
import React from "react";
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataPoint = {
  name: string;
  [key: string]: any;
};

type BarChartProps = {
  title: string;
  data: DataPoint[];
  categories: {
    key: string;
    name: string;
    color: string;
  }[];
  className?: string;
  vertical?: boolean;
};

const BarChart = ({
  title,
  data,
  categories,
  className,
  vertical = false,
}: BarChartProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={vertical ? "vertical" : "horizontal"}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis 
                dataKey={vertical ? undefined : "name"} 
                type={vertical ? "number" : "category"}
                className="text-xs" 
                stroke="currentColor"
                strokeOpacity={0.5}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                dataKey={vertical ? "name" : undefined}
                type={vertical ? "category" : "number"}
                className="text-xs" 
                stroke="currentColor"
                strokeOpacity={0.5}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
                }}
                itemStyle={{ padding: "4px 0" }}
              />
              <Legend />
              {categories.map((category) => (
                <Bar
                  key={category.key}
                  dataKey={category.key}
                  name={category.name}
                  fill={category.color}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChart;
