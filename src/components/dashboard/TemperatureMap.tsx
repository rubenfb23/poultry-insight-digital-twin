
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Mock data for the temperature map
const generateTemperatureData = () => {
  const rows = 10;
  const cols = 15;
  const data = [];
  
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      // Generate temperature between 20-28°C with some variation
      const baseTemp = 24;
      const variation = Math.random() * 4 - 2;
      row.push(baseTemp + variation);
    }
    data.push(row);
  }
  
  return data;
};

// Color scale for temperature
const getColorForTemperature = (temp: number) => {
  if (temp < 22) return 'bg-blue-100';
  if (temp < 23) return 'bg-blue-200';
  if (temp < 24) return 'bg-green-100';
  if (temp < 25) return 'bg-green-300';
  if (temp < 26) return 'bg-yellow-200';
  if (temp < 27) return 'bg-yellow-300';
  if (temp < 28) return 'bg-orange-300';
  return 'bg-red-400';
};

const TemperatureMap = () => {
  const tempData = React.useMemo(() => generateTemperatureData(), []);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Mapa Térmico en Tiempo Real</CardTitle>
        <CardDescription>Distribución de temperatura en la granja</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center justify-center">
          <div className="grid grid-flow-row auto-rows-max gap-px border border-slate-200 rounded-md overflow-hidden">
            {tempData.map((row, rowIndex) => (
              <div key={`row-${rowIndex}`} className="flex">
                {row.map((temp, colIndex) => (
                  <div 
                    key={`cell-${rowIndex}-${colIndex}`}
                    className={`w-5 h-5 ${getColorForTemperature(temp)}`}
                    title={`${temp.toFixed(1)}°C`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-4 flex justify-center items-center text-xs">
          <div className="flex items-center space-x-2">
            <span>20°C</span>
            <div className="flex">
              <div className="w-4 h-4 bg-blue-100"></div>
              <div className="w-4 h-4 bg-blue-200"></div>
              <div className="w-4 h-4 bg-green-100"></div>
              <div className="w-4 h-4 bg-green-300"></div>
              <div className="w-4 h-4 bg-yellow-200"></div>
              <div className="w-4 h-4 bg-yellow-300"></div>
              <div className="w-4 h-4 bg-orange-300"></div>
              <div className="w-4 h-4 bg-red-400"></div>
            </div>
            <span>28°C</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureMap;
