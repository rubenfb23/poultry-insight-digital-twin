
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Layers3 } from 'lucide-react';

// Generate mock feeding data
const generateFeedingData = () => {
  const days = 7; // Last 7 days
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.unshift({
      date: date.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' }),
      consumption: Math.floor(Math.random() * 300) + 700, // 700-1000 kg
      water: Math.floor(Math.random() * 1500) + 3500, // 3500-5000 liters
      ratio: (Math.random() * 0.4 + 1.6).toFixed(2), // 1.6-2.0 ratio
    });
  }
  
  return data;
};

// Generate feed consumption by hour
const generateHourlyData = () => {
  const hours = 24;
  const data = [];
  
  for (let hour = 0; hour < hours; hour++) {
    // Birds eat more during daylight hours
    let factor = 1;
    if (hour >= 6 && hour <= 19) {
      factor = 2 + Math.sin((hour - 6) / 13 * Math.PI); // Peak at midday
    }
    
    data.push({
      hour: `${hour}:00`,
      consumption: Math.floor(Math.random() * 20 * factor) + 10,
    });
  }
  
  return data;
};

// Feed composition data
const feedComposition = [
  { ingredient: 'Maíz', percentage: 60, color: '#F9CB40' },
  { ingredient: 'Harina de soja', percentage: 25, color: '#8FBC8F' },
  { ingredient: 'Aceite vegetal', percentage: 5, color: '#FFD700' },
  { ingredient: 'Carbonato de calcio', percentage: 4, color: '#D3D3D3' },
  { ingredient: 'Fosfato dicálcico', percentage: 3, color: '#C0C0C0' },
  { ingredient: 'Sal', percentage: 1, color: '#FFFFFF' },
  { ingredient: 'Aditivos', percentage: 2, color: '#ADD8E6' },
];

const FeedingPage = () => {
  const feedingData = React.useMemo(() => generateFeedingData(), []);
  const hourlyData = React.useMemo(() => generateHourlyData(), []);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Alimentación</h1>
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
          <Layers3 className="h-5 w-5 text-farm-teal mr-2" />
          <span className="font-medium">Lote: A-2023-14</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Consumo Diario</CardTitle>
            <CardDescription>Promedio última semana</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-teal">842 kg</span>
              <span className="text-sm text-muted-foreground mt-1">121 g/ave</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Alimenticia</CardTitle>
            <CardDescription>Acumulada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-blue">1.82</span>
              <span className="text-sm text-muted-foreground mt-1">kg alimento / kg ganancia</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Inventario Actual</CardTitle>
            <CardDescription>Silos disponibles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-orange">6.4 ton</span>
              <span className="text-sm text-muted-foreground mt-1">7.8 días restantes</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Consumo de Agua</CardTitle>
            <CardDescription>Ratio agua/alimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-green">1.92</span>
              <span className="text-sm text-muted-foreground mt-1">litros/kg alimento</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Consumo Semanal</CardTitle>
            <CardDescription>Alimento y agua últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={feedingData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#14B8A6" />
                  <YAxis yAxisId="right" orientation="right" stroke="#3B82F6" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="consumption" 
                    name="Alimento (kg)" 
                    stroke="#14B8A6" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="water" 
                    name="Agua (L)" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Patrón de Consumo</CardTitle>
            <CardDescription>Consumo por hora (kg)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="consumption" name="Consumo (kg)" fill="#F59E0B" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Registro de Alimentación</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Consumo (kg)</TableHead>
                  <TableHead>Agua (L)</TableHead>
                  <TableHead>Ratio Agua/Alimento</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {feedingData.map((day) => (
                  <TableRow key={day.date}>
                    <TableCell className="font-medium">{day.date}</TableCell>
                    <TableCell>{day.consumption}</TableCell>
                    <TableCell>{day.water}</TableCell>
                    <TableCell>{day.ratio}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Composición del Alimento</CardTitle>
            <CardDescription>Formula actual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedComposition.map((item) => (
                <div key={item.ingredient} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{item.ingredient}</span>
                    <span className="font-medium">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5">
                    <div 
                      className="h-2.5 rounded-full" 
                      style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedingPage;
