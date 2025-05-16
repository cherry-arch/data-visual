
import React from "react";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type DataPoint = {
  name: string;
  value: number;
  [key: string]: any;
};

type AreaChartProps = {
  title: string;
  data: DataPoint[];
  dataKey: string;
  strokeColor?: string;
  fillColor?: string;
  className?: string;
};

const AreaChart = ({
  title,
  data,
  dataKey,
  strokeColor = "#8884d8",
  fillColor = "rgba(136, 132, 216, 0.2)",
  className,
}: AreaChartProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id={`color-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={strokeColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/30" />
              <XAxis 
                dataKey="name" 
                className="text-xs" 
                stroke="currentColor"
                strokeOpacity={0.5}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
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
              <Area
                type="monotone"
                dataKey={dataKey}
                stroke={strokeColor}
                fillOpacity={1}
                fill={`url(#color-${dataKey})`}
              />
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AreaChart;
