
import React, { useEffect, useState } from 'react';
import { 
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer 
} from 'recharts';
import { cn } from '@/lib/utils';

type ChartType = 'line' | 'bar' | 'pie';
type TimeFrame = '7days' | 'month' | 'year';

interface ChartData {
  [key: string]: string | number;
}

interface ChartProps {
  title: string;
  type: ChartType;
  data: ChartData[];
  categories?: string[];
  colors?: string[];
  dataKey: string;
  nameKey?: string;
  className?: string;
}

const Chart: React.FC<ChartProps> = ({
  title,
  type = 'line',
  data,
  categories = ['Category'],
  colors = ['#4A80F0', '#FF994B', '#1AD598', '#FFC542', '#F95F60'],
  dataKey = 'value',
  nameKey = 'name',
  className,
}) => {
  const [timeFrame, setTimeFrame] = useState<TimeFrame>('7days');
  const [chartData, setChartData] = useState<ChartData[]>([]);

  // Simulate different data for different time frames
  useEffect(() => {
    if (timeFrame === '7days') {
      setChartData(data);
    } else if (timeFrame === 'month') {
      // Simulate monthly data
      setChartData(data.map(item => ({
        ...item,
        [dataKey]: typeof item[dataKey] === 'number' 
          ? Math.round((item[dataKey] as number) * 4.5) 
          : item[dataKey]
      })));
    } else {
      // Simulate yearly data
      setChartData(data.map(item => ({
        ...item,
        [dataKey]: typeof item[dataKey] === 'number' 
          ? Math.round((item[dataKey] as number) * 12) 
          : item[dataKey]
      })));
    }
  }, [timeFrame, data, dataKey]);

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.3} />
              <XAxis 
                dataKey={nameKey} 
                tick={{ fill: '#A0AEC0' }} 
                axisLine={{ stroke: '#2D3748' }} 
              />
              <YAxis 
                tick={{ fill: '#A0AEC0' }} 
                axisLine={{ stroke: '#2D3748' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A202C', 
                  borderColor: '#2D3748',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF' 
                }} 
              />
              <Legend />
              {categories.map((category, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={dataKey}
                  name={category}
                  stroke={colors[index % colors.length]}
                  strokeWidth={3}
                  dot={{ 
                    r: 4, 
                    strokeWidth: 2, 
                    fill: colors[index % colors.length], 
                    stroke: colors[index % colors.length] 
                  }}
                  activeDot={{ 
                    r: 6, 
                    stroke: colors[index % colors.length], 
                    strokeWidth: 2 
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2D3748" opacity={0.3} />
              <XAxis 
                dataKey={nameKey} 
                tick={{ fill: '#A0AEC0' }} 
                axisLine={{ stroke: '#2D3748' }} 
              />
              <YAxis 
                tick={{ fill: '#A0AEC0' }} 
                axisLine={{ stroke: '#2D3748' }} 
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A202C', 
                  borderColor: '#2D3748',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF' 
                }} 
              />
              <Legend />
              {categories.map((category, index) => (
                <Bar
                  key={index}
                  dataKey={dataKey}
                  name={category}
                  fill={colors[index % colors.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        );

      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey={dataKey}
                nameKey={nameKey}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1A202C', 
                  borderColor: '#2D3748',
                  borderRadius: '0.5rem',
                  color: '#FFFFFF' 
                }} 
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className={cn('glass-card p-5 glow-shadow animate-fade-in', className)}>
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-md font-medium">{title}</h3>
        <div className="flex space-x-1 text-xs">
          <button 
            onClick={() => setTimeFrame('7days')}
            className={cn(
              "px-3 py-1 rounded-full",
              timeFrame === '7days' 
                ? "bg-halvi-accent text-white" 
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeFrame('month')}
            className={cn(
              "px-3 py-1 rounded-full",
              timeFrame === 'month' 
                ? "bg-halvi-accent text-white" 
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            Month
          </button>
          <button 
            onClick={() => setTimeFrame('year')}
            className={cn(
              "px-3 py-1 rounded-full",
              timeFrame === 'year' 
                ? "bg-halvi-accent text-white" 
                : "text-muted-foreground hover:bg-muted"
            )}
          >
            Year
          </button>
        </div>
      </div>
      <div className="chart-container">
        {renderChart()}
      </div>
    </div>
  );
};

export default Chart;
