import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Settings, Plus, Wifi, WifiOff, Trash2, Edit } from 'lucide-react';

interface SensorConfig {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'inactive' | 'error';
  alertsEnabled: boolean;
  minThreshold?: number;
  maxThreshold?: number;
  lastReading?: string;
}

const SensorConfigPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sensors, setSensors] = useState<SensorConfig[]>([
    {
      id: '1',
      name: 'Sensor Temp Galpón 1',
      type: 'temperature',
      location: 'galpon-1',
      status: 'active',
      alertsEnabled: true,
      minThreshold: 18,
      maxThreshold: 32,
      lastReading: '24.5°C - hace 5 min'
    },
    {
      id: '2',
      name: 'Sensor Humedad Galpón 1',
      type: 'humidity',
      location: 'galpon-1',
      status: 'active',
      alertsEnabled: true,
      minThreshold: 40,
      maxThreshold: 80,
      lastReading: '65% - hace 5 min'
    },
    {
      id: '3',
      name: 'Báscula Galpón 2',
      type: 'weight',
      location: 'galpon-2',
      status: 'error',
      alertsEnabled: false,
      lastReading: 'Sin conexión'
    }
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const newSensor: SensorConfig = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      location: formData.get('location') as string,
      status: 'inactive',
      alertsEnabled: formData.get('alerts') === 'on',
      minThreshold: formData.get('minThreshold') ? parseFloat(formData.get('minThreshold') as string) : undefined,
      maxThreshold: formData.get('maxThreshold') ? parseFloat(formData.get('maxThreshold') as string) : undefined,
      lastReading: 'Pendiente de configuración'
    };

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setSensors(prev => [...prev, newSensor]);
    
    toast({
      title: "Sensor configurado",
      description: "El nuevo sensor ha sido añadido correctamente.",
    });
    
    setIsSubmitting(false);
    e.currentTarget.reset();
  };

  const toggleSensorStatus = (id: string) => {
    setSensors(prev => 
      prev.map(sensor => 
        sensor.id === id 
          ? { ...sensor, status: sensor.status === 'active' ? 'inactive' : 'active' }
          : sensor
      )
    );
  };

  const deleteSensor = (id: string) => {
    setSensors(prev => prev.filter(sensor => sensor.id !== id));
    toast({
      title: "Sensor eliminado",
      description: "El sensor ha sido eliminado correctamente.",
    });
  };

  const getSensorTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      temperature: 'Temperatura',
      humidity: 'Humedad',
      weight: 'Peso',
      water: 'Agua',
      feed: 'Alimento'
    };
    return types[type] || type;
  };

  const getLocationLabel = (location: string) => {
    const locations: Record<string, string> = {
      'galpon-1': 'Galpón 1',
      'galpon-2': 'Galpón 2',
      'galpon-3': 'Galpón 3',
      'exterior': 'Exterior'
    };
    return locations[location] || location;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'error': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <Wifi className="h-4 w-4" />;
      case 'inactive': return <WifiOff className="h-4 w-4" />;
      case 'error': return <WifiOff className="h-4 w-4 text-red-500" />;
      default: return <WifiOff className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Settings className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Configuración de Sensores</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Añadir Nuevo Sensor</span>
            </CardTitle>
            <CardDescription>
              Configure un nuevo sensor para monitoreo automático de su granja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre del Sensor</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Ej: Sensor Temp Galpón 1"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo de Sensor</Label>
                  <Select name="type" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="temperature">Temperatura</SelectItem>
                      <SelectItem value="humidity">Humedad</SelectItem>
                      <SelectItem value="weight">Peso</SelectItem>
                      <SelectItem value="water">Consumo de Agua</SelectItem>
                      <SelectItem value="feed">Consumo de Alimento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Ubicación</Label>
                  <Select name="location" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar ubicación" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="galpon-1">Galpón 1</SelectItem>
                      <SelectItem value="galpon-2">Galpón 2</SelectItem>
                      <SelectItem value="galpon-3">Galpón 3</SelectItem>
                      <SelectItem value="exterior">Exterior</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="alerts">Activar Alertas</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="alerts" name="alerts" />
                    <Label htmlFor="alerts" className="text-sm text-muted-foreground">
                      Notificaciones automáticas
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minThreshold">Umbral Mínimo</Label>
                  <Input
                    id="minThreshold"
                    name="minThreshold"
                    type="number"
                    step="0.1"
                    placeholder="18"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxThreshold">Umbral Máximo</Label>
                  <Input
                    id="maxThreshold"
                    name="maxThreshold"
                    type="number"
                    step="0.1"
                    placeholder="32"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Descripción adicional del sensor y su función..."
                />
              </div>
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "Configurando..." : "Añadir Sensor"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Sensores Activos</span>
            </CardTitle>
            <CardDescription>
              {sensors.length} sensores configurados
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sensors.map((sensor) => (
                <div key={sensor.id} className="border rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{sensor.name}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {getSensorTypeLabel(sensor.type)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {getLocationLabel(sensor.location)}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(sensor.status)}
                      <Badge className={`text-xs ${getStatusColor(sensor.status)}`}>
                        {sensor.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {sensor.lastReading}
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleSensorStatus(sensor.id)}
                    >
                      {sensor.status === 'active' ? 'Desactivar' : 'Activar'}
                    </Button>
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => deleteSensor(sensor.id)}
                      >
                        <Trash2 className="h-3 w-3 text-red-500" />
                      </Button>
                    </div>
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

export default SensorConfigPage;
