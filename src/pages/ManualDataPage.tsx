
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ThermometerSun, Droplets, Scale, Activity, AlertTriangle } from 'lucide-react';

const ManualDataPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (formData: FormData, dataType: string) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Datos guardados",
      description: `Los datos de ${dataType} han sido registrados correctamente.`,
    });
    
    setIsSubmitting(false);
  };

  const EnvironmentalForm = () => {
    const handleEnvironmentalSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit(formData, "ambiente");
      e.currentTarget.reset();
    };

    return (
      <form onSubmit={handleEnvironmentalSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="temperature">Temperatura (°C)</Label>
            <Input
              id="temperature"
              name="temperature"
              type="number"
              step="0.1"
              placeholder="24.5"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="humidity">Humedad (%)</Label>
            <Input
              id="humidity"
              name="humidity"
              type="number"
              step="0.1"
              placeholder="65.0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Ubicación</Label>
            <Select name="location" required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar galpón" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="galpon-1">Galpón 1</SelectItem>
                <SelectItem value="galpon-2">Galpón 2</SelectItem>
                <SelectItem value="galpon-3">Galpón 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="datetime">Fecha y Hora</Label>
            <Input
              id="datetime"
              name="datetime"
              type="datetime-local"
              defaultValue={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Observaciones</Label>
          <Textarea
            id="notes"
            name="notes"
            placeholder="Observaciones adicionales sobre las condiciones ambientales..."
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Guardando..." : "Guardar Datos Ambientales"}
        </Button>
      </form>
    );
  };

  const ProductionForm = () => {
    const handleProductionSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      handleSubmit(formData, "producción");
      e.currentTarget.reset();
    };

    return (
      <form onSubmit={handleProductionSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weight">Peso Promedio (kg)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              step="0.01"
              placeholder="1.85"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mortality">Mortandad Diaria</Label>
            <Input
              id="mortality"
              name="mortality"
              type="number"
              placeholder="5"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="feed-consumption">Consumo de Alimento (kg)</Label>
            <Input
              id="feed-consumption"
              name="feed-consumption"
              type="number"
              step="0.1"
              placeholder="180.5"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="water-consumption">Consumo de Agua (L)</Label>
            <Input
              id="water-consumption"
              name="water-consumption"
              type="number"
              step="0.1"
              placeholder="850.0"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="age">Edad del Lote (días)</Label>
            <Input
              id="age"
              name="age"
              type="number"
              placeholder="42"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="production-datetime">Fecha y Hora</Label>
            <Input
              id="production-datetime"
              name="production-datetime"
              type="datetime-local"
              defaultValue={new Date().toISOString().slice(0, 16)}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="production-notes">Observaciones</Label>
          <Textarea
            id="production-notes"
            name="production-notes"
            placeholder="Observaciones sobre la producción, comportamiento de las aves, etc..."
          />
        </div>
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Guardando..." : "Guardar Datos de Producción"}
        </Button>
      </form>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Activity className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Entrada de Datos Manuales</h1>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Registrar Datos</CardTitle>
            <CardDescription>
              Ingrese los datos manualmente para mantener un registro actualizado de su granja.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="environmental" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="environmental" className="flex items-center space-x-2">
                  <ThermometerSun className="h-4 w-4" />
                  <span>Ambiente</span>
                </TabsTrigger>
                <TabsTrigger value="production" className="flex items-center space-x-2">
                  <Scale className="h-4 w-4" />
                  <span>Producción</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="environmental" className="mt-6">
                <EnvironmentalForm />
              </TabsContent>
              
              <TabsContent value="production" className="mt-6">
                <ProductionForm />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <span>Consejos</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm space-y-2">
                <p><strong>Frecuencia de registro:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Datos ambientales: 2-3 veces al día</li>
                  <li>Peso: Semanalmente</li>
                  <li>Mortandad: Diariamente</li>
                  <li>Consumos: Diariamente</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Últimos Registros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperatura:</span>
                  <span>24.5°C (hace 2h)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Peso:</span>
                  <span>1.82kg (ayer)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Mortandad:</span>
                  <span>12 aves (hoy)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManualDataPage;
