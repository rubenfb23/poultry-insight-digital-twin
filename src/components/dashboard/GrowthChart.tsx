
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Generate mock data for growth chart
const generateGrowthData = () => {
  const days = 35; // 35 days of growth
  const data = [];
  
  // Ideal growth curve parameters (sigmoid-like)
  const maxWeight = 2800; // max weight in grams
  const growthRate = 0.15;
  const midpoint = 20; // day of fastest growth
  
  for (let day = 1; day <= days; day++) {
    // Calculate ideal weight using a sigmoid function
    const idealWeight = maxWeight / (1 + Math.exp(-growthRate * (day - midpoint)));
    
    // Calculate actual weight with some variation
    const variation = Math.random() * 0.1 - 0.05; // -5% to +5%
    const actualWeight = idealWeight * (1 + variation);
    
    data.push({
      day,
      ideal: Math.round(idealWeight),
      actual: Math.round(actualWeight),
    });
  }
  
  return data;
};

const GrowthChart = () => {
  const data = React.useMemo(() => generateGrowthData(), []);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Curva de Crecimiento</CardTitle>
        <CardDescription>Peso real vs ideal (g)</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" label={{ value: 'Días', position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: 'Peso (g)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="ideal" 
                name="Peso Ideal" 
                stroke="#8B5CF6" 
                strokeDasharray="5 5" 
              />
              <Line 
                type="monotone" 
                dataKey="actual" 
                name="Peso Real" 
                stroke="#14B8A6" 
                strokeWidth={2} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrowthChart;
