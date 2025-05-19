
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Timer } from 'lucide-react';

// Generate growth data by day
const generateGrowthData = () => {
  const days = 35; // 35 days of growth
  const data = [];
  
  // Sigmoid growth function parameters
  const maxWeight = 2800; // max weight in grams
  const growthRate = 0.15;
  const midpoint = 20; // day of fastest growth
  
  for (let day = 1; day <= days; day++) {
    // Calculate ideal weight using sigmoid function
    const idealWeight = maxWeight / (1 + Math.exp(-growthRate * (day - midpoint)));
    
    // Calculate actual weight with some variation
    const variation = Math.random() * 0.1 - 0.05; // -5% to +5%
    const actualWeight = idealWeight * (1 + variation);
    
    // Calculate daily gain
    const prevIdealWeight = day > 1 
      ? maxWeight / (1 + Math.exp(-growthRate * (day - 1 - midpoint)))
      : 0;
    const dailyGain = idealWeight - prevIdealWeight;
    
    data.push({
      day,
      ideal: Math.round(idealWeight),
      actual: Math.round(actualWeight),
      gain: Math.round(dailyGain),
    });
  }
  
  return data;
};

// Generate weight distribution data
const generateWeightDistribution = () => {
  const distributions = [];
  const mean = 2100; // mean weight in grams
  const stdDev = 180; // standard deviation
  
  // Generate normal distribution
  for (let weight = mean - 3 * stdDev; weight <= mean + 3 * stdDev; weight += stdDev / 2) {
    const frequency = Math.exp(-0.5 * Math.pow((weight - mean) / stdDev, 2)) / (stdDev * Math.sqrt(2 * Math.PI));
    distributions.push({
      weight,
      frequency: frequency * 4000, // Scale for visibility
    });
  }
  
  return distributions;
};

const GrowthPage = () => {
  const growthData = React.useMemo(() => generateGrowthData(), []);
  const distributionData = React.useMemo(() => generateWeightDistribution(), []);
  
  // Get current data points
  const currentDay = 29; // Assuming we are at day 29
  const currentData = growthData[currentDay - 1];
  
  // Calculate uniformity
  const uniformity = 87.5; // Usually between 80-90%
  
  // Calculate weekly growth rate
  const weeklyGrowthRate = (
    (growthData[currentDay - 1].actual - growthData[currentDay - 8].actual) / 
    growthData[currentDay - 8].actual * 100
  ).toFixed(1);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Peso y Crecimiento</h1>
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
          <Timer className="h-5 w-5 text-farm-green mr-2" />
          <span className="font-medium">Lote: A-2023-14 (Día {currentDay})</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Peso Actual</CardTitle>
            <CardDescription>Promedio del lote</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-green">{currentData.actual} g</span>
              <span className="text-sm text-muted-foreground mt-1">
                {currentData.actual > currentData.ideal ? '+' : ''}
                {currentData.actual - currentData.ideal} g vs estándar
              </span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ganancia Diaria</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-blue">78.6 g</span>
              <span className="text-sm text-muted-foreground mt-1">+3.2% vs estándar</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Uniformidad</CardTitle>
            <CardDescription>Coeficiente de variación</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-purple">{uniformity}%</span>
              <span className="text-sm text-muted-foreground mt-1">CV: 8.2%</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Crecimiento Semanal</CardTitle>
            <CardDescription>Tasa de crecimiento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-orange">{weeklyGrowthRate}%</span>
              <span className="text-sm text-muted-foreground mt-1">últimos 7 días</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Curva de Crecimiento</CardTitle>
            <CardDescription>Peso real vs ideal (g)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={growthData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
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
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Ganancia Diaria de Peso</CardTitle>
            <CardDescription>Gramos por día</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={growthData.filter(d => d.day > 0)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="gain" name="Ganancia (g)" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribución de Pesos</CardTitle>
            <CardDescription>Día {currentDay}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={distributionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="weight" 
                    type="number"
                    domain={['dataMin', 'dataMax']} 
                    tickFormatter={(tick) => `${tick}g`}
                  />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} aves`, 'Cantidad']} labelFormatter={(label) => `${label}g`} />
                  <Area type="monotone" dataKey="frequency" name="Cantidad" fill="#6366F1" stroke="#4F46E5" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Registro de Pesos</CardTitle>
            <CardDescription>Últimos 14 días</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Día</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Peso Real (g)</TableHead>
                  <TableHead>Peso Estándar (g)</TableHead>
                  <TableHead>Diferencia (%)</TableHead>
                  <TableHead>Ganancia Diaria (g)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {growthData.slice(currentDay - 14, currentDay).map((day) => {
                  const date = new Date();
                  date.setDate(date.getDate() - (currentDay - day.day));
                  const diffPercent = ((day.actual - day.ideal) / day.ideal * 100).toFixed(1);
                  
                  return (
                    <TableRow key={day.day}>
                      <TableCell className="font-medium">{day.day}</TableCell>
                      <TableCell>
                        {date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' })}
                      </TableCell>
                      <TableCell>{day.actual}</TableCell>
                      <TableCell>{day.ideal}</TableCell>
                      <TableCell className={
                        diffPercent > 0 ? 'text-green-600' : diffPercent < 0 ? 'text-red-600' : ''
                      }>
                        {diffPercent > 0 ? '+' : ''}{diffPercent}%
                      </TableCell>
                      <TableCell>{day.gain}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GrowthPage;
