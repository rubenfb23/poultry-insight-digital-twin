
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import TemperatureMap from '@/components/dashboard/TemperatureMap';
import ConsumptionChart from '@/components/dashboard/ConsumptionChart';
import MortalityChart from '@/components/dashboard/MortalityChart';
import GrowthChart from '@/components/dashboard/GrowthChart';
import EnvironmentalFactors from '@/components/dashboard/EnvironmentalFactors';
import { ThermometerSun, Droplets, ArrowDown, Timer, PowerIcon, Gauge } from 'lucide-react';
import { useFarmMonitoring } from '@/hooks/useFarmMonitoring';

const Dashboard = () => {
  // Initialize farm monitoring
  useFarmMonitoring();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Panel de Control</h1>
      
      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard 
          title="Temperatura Promedio" 
          value="24.5 °C" 
          icon={<ThermometerSun className="h-5 w-5" />} 
          trend={{ value: 1.2, isPositive: true }}
          color="text-farm-blue"
        />
        
        <StatCard 
          title="Consumo de Agua" 
          value="850 L" 
          icon={<Droplets className="h-5 w-5" />} 
          trend={{ value: 2.5, isPositive: false }}
          color="text-farm-teal"
        />
        
        <StatCard 
          title="Mortandad Diaria" 
          value="12 aves" 
          icon={<ArrowDown className="h-5 w-5" />} 
          trend={{ value: 0.8, isPositive: true }}
          color="text-farm-red"
        />
        
        <StatCard 
          title="Peso Promedio" 
          value="1.82 kg" 
          icon={<Timer className="h-5 w-5" />} 
          trend={{ value: 3.5, isPositive: true }}
          color="text-farm-green"
        />
        
        <StatCard 
          title="Consumo Eléctrico" 
          value="215 kWh" 
          icon={<PowerIcon className="h-5 w-5" />} 
          trend={{ value: 1.5, isPositive: false }}
          color="text-farm-purple"
        />
        
        <StatCard 
          title="Eficiencia Productiva" 
          value="98.2%" 
          icon={<Gauge className="h-5 w-5" />} 
          trend={{ value: 0.3, isPositive: true }}
          color="text-farm-orange"
        />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Temperature Map */}
        <div className="lg:col-span-4">
          <TemperatureMap />
        </div>
        
        {/* Environmental Factors */}
        <div className="lg:col-span-4">
          <EnvironmentalFactors />
        </div>
        
        {/* Mortality Chart */}
        <div className="lg:col-span-4">
          <MortalityChart />
        </div>
        
        {/* Growth Chart */}
        <div className="lg:col-span-6">
          <GrowthChart />
        </div>
        
        {/* Consumption Chart */}
        <div className="lg:col-span-6">
          <ConsumptionChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
