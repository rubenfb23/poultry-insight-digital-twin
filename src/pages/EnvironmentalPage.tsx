
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import TemperatureMap from '@/components/dashboard/TemperatureMap';
import EnvironmentalFactors from '@/components/dashboard/EnvironmentalFactors';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Generate mock data for environmental history
const generateHistoricalData = (factor: string) => {
  const hours = 24;
  const data = [];
  
  const baseValue = factor === 'temperature' ? 24 :
                    factor === 'humidity' ? 65 :
                    factor === 'co2' ? 800 :
                    factor === 'nh3' ? 10 : 50;
                    
  const amplitude = factor === 'temperature' ? 3 :
                   factor === 'humidity' ? 10 :
                   factor === 'co2' ? 300 :
                   factor === 'nh3' ? 5 : 10;
  
  for (let i = 0; i < hours; i++) {
    // Generate values with natural patterns
    const time = new Date();
    time.setHours(time.getHours() - (hours - i));
    
    const sinComponent = Math.sin(i / 4) * amplitude / 2;
    const randomComponent = (Math.random() - 0.5) * amplitude / 2;
    const value = baseValue + sinComponent + randomComponent;
    
    data.push({
      time: time.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
      value: factor === 'co2' || factor === 'nh3' ? Math.round(value) : Number(value.toFixed(1)),
    });
  }
  
  return data;
};

const EnvironmentalPage = () => {
  const [timeRange, setTimeRange] = React.useState('24h');
  
  const temperatureData = React.useMemo(() => generateHistoricalData('temperature'), []);
  const humidityData = React.useMemo(() => generateHistoricalData('humidity'), []);
  const co2Data = React.useMemo(() => generateHistoricalData('co2'), []);
  const nh3Data = React.useMemo(() => generateHistoricalData('nh3'), []);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Monitoreo Ambiental</h1>
        
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Temperature Map */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Mapa Térmico</CardTitle>
            <CardDescription>Distribución actual de temperatura</CardDescription>
          </CardHeader>
          <CardContent>
            <TemperatureMap />
          </CardContent>
        </Card>
        
        {/* Current Readings */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Lecturas Actuales</CardTitle>
            <CardDescription>Valores en tiempo real</CardDescription>
          </CardHeader>
          <CardContent>
            <EnvironmentalFactors />
          </CardContent>
        </Card>
      </div>
      
      {/* Historical Data Tabs */}
      <Card>
        <CardHeader>
          <CardTitle>Historial de Datos Ambientales</CardTitle>
          <CardDescription>Evolución de variables ambientales</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="temperature" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="temperature">Temperatura</TabsTrigger>
              <TabsTrigger value="humidity">Humedad</TabsTrigger>
              <TabsTrigger value="co2">CO2</TabsTrigger>
              <TabsTrigger value="nh3">NH3</TabsTrigger>
            </TabsList>
            
            <TabsContent value="temperature" className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={temperatureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[20, 30]} label={{ value: '°C', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Temperatura" stroke="#0EA5E9" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="humidity" className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={humidityData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[50, 80]} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="Humedad" stroke="#14B8A6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="co2" className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={co2Data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[400, 1200]} label={{ value: 'ppm', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="CO2" stroke="#10B981" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            
            <TabsContent value="nh3" className="pt-4">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={nh3Data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis domain={[0, 20]} label={{ value: 'ppm', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" name="NH3" stroke="#8B5CF6" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnvironmentalPage;
