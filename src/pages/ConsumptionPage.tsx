
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { PowerIcon, Droplets } from 'lucide-react';

// Generate hourly electricity data
const generateHourlyElectricityData = () => {
  const hours = 24;
  const data = [];
  
  for (let hour = 0; hour < hours; hour++) {
    // More electricity usage during daytime for lights, less at night
    let factor = 1;
    if (hour >= 6 && hour <= 19) {
      factor = 1.5 + Math.sin((hour - 6) / 13 * Math.PI); // Peak during midday
    }
    
    data.push({
      hour: `${hour}:00`,
      usage: Math.floor(Math.random() * 5 * factor) + 5, // 5-15 kWh per hour
      temperature: Math.floor(Math.random() * 6) + 22, // 22-28°C
    });
  }
  
  return data;
};

// Generate daily consumption data
const generateDailyConsumptionData = () => {
  const days = 14; // 2 weeks
  const data = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    const dayName = date.toLocaleDateString('es-ES', { weekday: 'short' });
    const formattedDate = date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit' });
    
    data.unshift({
      date: `${dayName} ${formattedDate}`,
      electricity: Math.floor(Math.random() * 50) + 170, // 170-220 kWh per day
      water: Math.floor(Math.random() * 1000) + 3500, // 3500-4500L per day
    });
  }
  
  return data;
};

// Generate consumption breakdown data
const generateConsumptionBreakdown = () => {
  return [
    { name: 'Ventilación', value: 42, color: '#3B82F6' },
    { name: 'Iluminación', value: 18, color: '#F59E0B' },
    { name: 'Alimentación', value: 23, color: '#10B981' },
    { name: 'Refrigeración', value: 12, color: '#8B5CF6' },
    { name: 'Otros', value: 5, color: '#6B7280' },
  ];
};

const ConsumptionPage = () => {
  const hourlyData = React.useMemo(() => generateHourlyElectricityData(), []);
  const dailyData = React.useMemo(() => generateDailyConsumptionData(), []);
  const electricBreakdown = React.useMemo(() => generateConsumptionBreakdown(), []);
  
  // Calculate today's and average values
  const todayElectricity = dailyData[dailyData.length - 1].electricity;
  const todayWater = dailyData[dailyData.length - 1].water;
  
  const avgElectricity = Math.round(
    dailyData.reduce((sum, day) => sum + day.electricity, 0) / dailyData.length
  );
  
  const avgWater = Math.round(
    dailyData.reduce((sum, day) => sum + day.water, 0) / dailyData.length
  );
  
  // Calculate per-bird metrics
  const birdCount = 15000;
  const electricityPerBird = (todayElectricity / birdCount * 1000).toFixed(1); // Wh per bird
  const waterPerBird = (todayWater / birdCount).toFixed(2); // L per bird
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Consumos</h1>
        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow-sm">
          <PowerIcon className="h-5 w-5 text-farm-purple mr-2" />
          <span className="font-medium">Lote: A-2023-14</span>
        </div>
      </div>
      
      <Tabs defaultValue="electricity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="electricity">Electricidad</TabsTrigger>
          <TabsTrigger value="water">Agua</TabsTrigger>
        </TabsList>
        
        <TabsContent value="electricity" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Consumo Hoy</CardTitle>
                <CardDescription>Total del día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-purple">{todayElectricity} kWh</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {todayElectricity > avgElectricity ? '+' : ''}
                    {todayElectricity - avgElectricity} kWh vs promedio
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Promedio Diario</CardTitle>
                <CardDescription>Últimos 14 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-blue">{avgElectricity} kWh</span>
                  <span className="text-sm text-muted-foreground mt-1">14.6 kWh/h promedio</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Consumo por Ave</CardTitle>
                <CardDescription>Hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-teal">{electricityPerBird} Wh</span>
                  <span className="text-sm text-muted-foreground mt-1">por ave</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Costo Estimado</CardTitle>
                <CardDescription>Tarifa promedio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-orange">€32.40</span>
                  <span className="text-sm text-muted-foreground mt-1">€0.15/kWh</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Consumo por Hora</CardTitle>
                <CardDescription>Últimas 24 horas (kWh)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={hourlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#EF4444" />
                      <Tooltip />
                      <Legend />
                      <Line 
                        yAxisId="left"
                        type="monotone" 
                        dataKey="usage" 
                        name="Consumo (kWh)" 
                        stroke="#8B5CF6" 
                        strokeWidth={2} 
                      />
                      <Line 
                        yAxisId="right"
                        type="monotone" 
                        dataKey="temperature" 
                        name="Temperatura (°C)" 
                        stroke="#EF4444" 
                        strokeWidth={2} 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Distribución por Equipo</CardTitle>
                <CardDescription>Porcentaje de consumo</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={electricBreakdown}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {electricBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4">
                  <ul className="space-y-2">
                    {electricBreakdown.map((item) => (
                      <li key={item.name} className="flex items-center">
                        <span 
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        ></span>
                        <span>{item.name}: {item.value}%</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="water" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Consumo Hoy</CardTitle>
                <CardDescription>Total del día</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-teal">{todayWater} L</span>
                  <span className="text-sm text-muted-foreground mt-1">
                    {todayWater > avgWater ? '+' : ''}
                    {todayWater - avgWater} L vs promedio
                  </span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Promedio Diario</CardTitle>
                <CardDescription>Últimos 14 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-blue">{avgWater} L</span>
                  <span className="text-sm text-muted-foreground mt-1">{(avgWater / 1000).toFixed(2)} m³/día</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Consumo por Ave</CardTitle>
                <CardDescription>Hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-green">{waterPerBird} L</span>
                  <span className="text-sm text-muted-foreground mt-1">por ave</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Ratio Agua/Alimento</CardTitle>
                <CardDescription>Hoy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold text-farm-orange">1.92</span>
                  <span className="text-sm text-muted-foreground mt-1">litros/kg alimento</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Tendencia de Consumo de Agua</CardTitle>
              <CardDescription>Últimos 14 días (L)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="water" name="Consumo de Agua (L)" fill="#0EA5E9" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Consumos Diarios</CardTitle>
          <CardDescription>Electricidad y agua por día</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" orientation="left" stroke="#8B5CF6" />
                <YAxis yAxisId="right" orientation="right" stroke="#0EA5E9" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="electricity" 
                  name="Electricidad (kWh)" 
                  stroke="#8B5CF6" 
                  strokeWidth={2} 
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="water" 
                  name="Agua (L)" 
                  stroke="#0EA5E9" 
                  strokeWidth={2} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Registro de Consumos</CardTitle>
          <CardDescription>Últimos 14 días</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Electricidad (kWh)</TableHead>
                <TableHead>Agua (L)</TableHead>
                <TableHead>Costo Eléctrico (€)</TableHead>
                <TableHead>L Agua / Ave</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyData.map((day) => (
                <TableRow key={day.date}>
                  <TableCell className="font-medium">{day.date}</TableCell>
                  <TableCell>{day.electricity}</TableCell>
                  <TableCell>{day.water}</TableCell>
                  <TableCell>{(day.electricity * 0.15).toFixed(2)}</TableCell>
                  <TableCell>{(day.water / birdCount).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsumptionPage;
