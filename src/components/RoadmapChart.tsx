
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, LineChart, Line } from 'recharts';

interface ChartData {
  name: string;
  value: number;
  label?: string;
}

interface RoadmapChartProps {
  data: ChartData[];
  color: string;
  title: string;
  description?: string;
  height?: number;
  chartType?: 'area' | 'bar' | 'line';
  yAxisLabel?: string;
  xAxisLabel?: string;
}

const formatYAxisTick = (value: number) => {
  if (value >= 1000) {
    return `${value / 1000}k`;
  }
  return value;
};

const RoadmapChart: React.FC<RoadmapChartProps> = ({ 
  data, 
  color, 
  title, 
  description, 
  height = 300, 
  chartType = 'area',
  yAxisLabel,
  xAxisLabel
}) => {
  // Create custom renderer for tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-gray-100">
          <p className="font-semibold text-gray-800">{dataPoint.name}</p>
          <p className="text-sm text-gray-600">
            {dataPoint.label || `${payload[0].value} ${yAxisLabel || ''}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    switch (chartType) {
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
              label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -20 } : undefined}
            />
            <YAxis 
              tickFormatter={formatYAxisTick} 
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              fill={color} 
              radius={[4, 4, 0, 0]} 
              barSize={30}
              animationDuration={1500}
            />
          </BarChart>
        );
      
      case 'line':
        return (
          <LineChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
              label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -20 } : undefined}
            />
            <YAxis 
              tickFormatter={formatYAxisTick} 
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              strokeWidth={3}
              dot={{ fill: color, strokeWidth: 2, r: 6 }}
              activeDot={{ fill: color, strokeWidth: 0, r: 8 }}
              animationDuration={1500}
            />
          </LineChart>
        );
      
      default: // area chart
        return (
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 30 }}
          >
            <defs>
              <linearGradient id={`colorGradient-${title.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={color} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
            <XAxis 
              dataKey="name" 
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              padding={{ left: 10, right: 10 }}
              label={xAxisLabel ? { value: xAxisLabel, position: 'insideBottom', offset: -20 } : undefined}
            />
            <YAxis 
              tickFormatter={formatYAxisTick} 
              axisLine={{ stroke: '#e5e7eb' }}
              tickLine={false}
              tick={{ fill: '#6b7280', fontSize: 12 }}
              label={yAxisLabel ? { value: yAxisLabel, angle: -90, position: 'insideLeft' } : undefined}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1}
              fill={`url(#colorGradient-${title.replace(/\s+/g, '')})`}
              animationDuration={1500}
            />
          </AreaChart>
        );
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      <div style={{ height: `${height}px` }} className="w-full">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RoadmapChart;
