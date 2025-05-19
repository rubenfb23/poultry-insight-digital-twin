
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface EnvironmentalFactorProps {
  label: string;
  value: number;
  unit: string;
  min: number;
  max: number;
  optimalMin: number;
  optimalMax: number;
  color: string;
}

const EnvironmentalFactor = ({ 
  label, 
  value, 
  unit, 
  min, 
  max, 
  optimalMin, 
  optimalMax,
  color
}: EnvironmentalFactorProps) => {
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Determine if the value is within the optimal range
  const isOptimal = value >= optimalMin && value <= optimalMax;
  
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium">{label}</span>
        <span className={`text-sm font-semibold ${isOptimal ? 'text-green-500' : 'text-orange-500'}`}>
          {value} {unit}
        </span>
      </div>
      
      <div className="relative">
        <Progress value={percentage} className={`h-2 ${color}`} />
        
        {/* Optimal range indicators */}
        <div 
          className="absolute top-0 h-2 border-l-2 border-gray-600"
          style={{ left: `${((optimalMin - min) / (max - min)) * 100}%` }}
        />
        <div 
          className="absolute top-0 h-2 border-l-2 border-gray-600"
          style={{ left: `${((optimalMax - min) / (max - min)) * 100}%` }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground mt-1">
        <span>{min}{unit}</span>
        <span>{max}{unit}</span>
      </div>
    </div>
  );
};

const EnvironmentalFactors = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Factores Ambientales</CardTitle>
        <CardDescription>Condiciones actuales</CardDescription>
      </CardHeader>
      
      <CardContent>
        <EnvironmentalFactor 
          label="Temperatura"
          value={24.5}
          unit="°C"
          min={15}
          max={35}
          optimalMin={22}
          optimalMax={26}
          color="bg-farm-blue"
        />
        
        <EnvironmentalFactor 
          label="Humedad"
          value={65}
          unit="%"
          min={30}
          max={90}
          optimalMin={60}
          optimalMax={70}
          color="bg-farm-teal"
        />
        
        <EnvironmentalFactor 
          label="CO2"
          value={850}
          unit="ppm"
          min={400}
          max={3000}
          optimalMin={400}
          optimalMax={1500}
          color="bg-farm-green"
        />
        
        <EnvironmentalFactor 
          label="NH3"
          value={12}
          unit="ppm"
          min={0}
          max={25}
          optimalMin={0}
          optimalMax={15}
          color="bg-farm-purple"
        />
      </CardContent>
    </Card>
  );
};

export default EnvironmentalFactors;
