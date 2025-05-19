
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { ArrowDown } from 'lucide-react';

// Generate mock mortality data for the last 15 days
const generateDailyMortalityData = () => {
  const days = 15;
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    data.unshift({
      date: date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' }),
      count: Math.floor(Math.random() * 18) + 5, // 5-22 mortality
      percentage: ((Math.random() * 0.15) + 0.05).toFixed(2), // 0.05-0.20%
    });
  }
  
  return data;
};

// Generate zone-based mortality data
const generateZoneMortality = () => {
  const zones = ['A1', 'A2', 'A3', 'B1', 'B2', 'B3', 'C1', 'C2', 'C3'];
  return zones.map(zone => ({
    zone,
    count: Math.floor(Math.random() * 25) + 1, // 1-25 deaths per zone
  }));
};

// Generate cause breakdown data
const generateCauseData = () => {
  const causes = [
    { name: 'Cardiorespiratorio', value: 32, color: '#EF4444' },
    { name: 'Digestivo', value: 27, color: '#F59E0B' },
    { name: 'Estrés por calor', value: 18, color: '#8B5CF6' },
    { name: 'Traumatismo', value: 15, color: '#10B981' },
    { name: 'Otras causas', value: 8, color: '#6B7280' },
  ];
  
  return causes;
};

const MortalityPage = () => {
  const mortalityData = React.useMemo(() => generateDailyMortalityData(), []);
  const zoneData = React.useMemo(() => generateZoneMortality(), []);
  const causeData = React.useMemo(() => generateCauseData(), []);
  
  // Calculate totals
  const totalMortality = mortalityData.reduce((sum, day) => sum + day.count, 0);
  const avgDailyMortality = (totalMortality / mortalityData.length).toFixed(1);
  const accumulatedPercentage = ((totalMortality / 15000) * 100).toFixed(2); // Assuming 15,000 birds
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Mortandad</h1>
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
          <ArrowDown className="h-5 w-5 text-farm-red mr-2" />
          <span className="font-medium">Lote: A-2023-14</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mortandad Total</CardTitle>
            <CardDescription>Acumulado del lote</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-red">{totalMortality} aves</span>
              <span className="text-sm text-muted-foreground mt-1">{accumulatedPercentage}% del lote</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Promedio Diario</CardTitle>
            <CardDescription>Últimos 15 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-orange">{avgDailyMortality}</span>
              <span className="text-sm text-muted-foreground mt-1">aves por día</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Mortandad Semanal</CardTitle>
            <CardDescription>Últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-blue">87 aves</span>
              <span className="text-sm text-muted-foreground mt-1">0.58% del lote</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tasa de Viabilidad</CardTitle>
            <CardDescription>Estimación final</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-farm-green">97.1%</span>
              <span className="text-sm text-muted-foreground mt-1">proyección al día 42</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Evolución de Mortandad Diaria</CardTitle>
            <CardDescription>Últimos 15 días</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mortalityData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#EF4444" />
                  <YAxis yAxisId="right" orientation="right" stroke="#8B5CF6" />
                  <Tooltip />
                  <Legend />
                  <Bar
                    yAxisId="left"
                    dataKey="count"
                    name="Aves"
                    fill="#EF4444"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="percentage" 
                    name="Porcentaje (%)" 
                    stroke="#8B5CF6" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribución por Zonas</CardTitle>
            <CardDescription>Mapa de calor</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={zoneData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="zone" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Mortandad" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Registro Detallado</CardTitle>
            <CardDescription>Mortandad diaria</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Mortandad</TableHead>
                  <TableHead>Porcentaje</TableHead>
                  <TableHead>Acumulado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mortalityData.slice(0, 10).map((day, index) => {
                  const accumulated = mortalityData
                    .slice(0, index + 1)
                    .reduce((sum, d) => sum + d.count, 0);
                    
                  return (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell>{day.count} aves</TableCell>
                      <TableCell>{day.percentage}%</TableCell>
                      <TableCell>{accumulated} aves</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Causas de Mortandad</CardTitle>
            <CardDescription>Distribución por tipo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={causeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {causeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4">
              <ul className="space-y-2">
                {causeData.map((cause) => (
                  <li key={cause.name} className="flex items-center">
                    <span 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: cause.color }}
                    ></span>
                    <span>{cause.name}: {cause.value} aves</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MortalityPage;
