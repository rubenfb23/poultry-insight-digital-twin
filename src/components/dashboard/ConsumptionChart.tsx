
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Generate mock data for the consumption chart
const generateConsumptionData = () => {
  const hours = 24;
  const data = [];
  
  for (let i = 0; i < hours; i++) {
    // Generate consumption values with natural patterns
    const hour = i;
    const power = 50 + Math.sin(i / 3) * 15 + Math.random() * 10;
    const water = 35 + Math.cos(i / 6) * 10 + Math.random() * 5;
    const feed = 40 + Math.sin(i / 4) * 20 + Math.random() * 15;
    
    data.push({
      hour: hour.toString().padStart(2, '0') + ':00',
      power,
      water,
      feed,
    });
  }
  
  return data;
};

const ConsumptionChart = () => {
  const [timeRange, setTimeRange] = React.useState('24h');
  const data = React.useMemo(() => generateConsumptionData(), []);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Consumos</CardTitle>
            <CardDescription>Energía, agua y alimento</CardDescription>
          </div>
          
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 horas</SelectItem>
              <SelectItem value="7d">7 días</SelectItem>
              <SelectItem value="30d">30 días</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="power" stroke="#0EA5E9" name="Energía (kW)" />
              <Line type="monotone" dataKey="water" stroke="#10B981" name="Agua (L)" />
              <Line type="monotone" dataKey="feed" stroke="#F97316" name="Alimento (kg)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsumptionChart;
