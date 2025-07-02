
import { useEffect } from 'react';
import { notificationService } from '@/services/notificationService';

export const useFarmMonitoring = () => {
  useEffect(() => {
    // Simulate real-time monitoring with random data variations
    const interval = setInterval(() => {
      // Simulate temperature readings
      const temperature = 20 + Math.random() * 20; // 20-40°C range
      notificationService.checkTemperatureAlerts(temperature);

      // Simulate mortality check (daily)
      if (Math.random() < 0.1) { // 10% chance to check mortality
        const dailyMortality = Math.floor(Math.random() * 25);
        const averageMortality = 8;
        notificationService.checkMortalityAlerts(dailyMortality, averageMortality);
      }

      // Simulate feed consumption check
      if (Math.random() < 0.15) { // 15% chance to check feed
        const currentConsumption = 180 + (Math.random() - 0.5) * 60;
        const expectedConsumption = 200;
        notificationService.checkFeedAlerts(currentConsumption, expectedConsumption);
      }

      // Simulate water consumption check
      if (Math.random() < 0.12) { // 12% chance to check water
        const currentWater = 800 + (Math.random() - 0.5) * 200;
        const expectedWater = 850;
        notificationService.checkWaterAlerts(currentWater, expectedWater);
      }

      // Simulate growth monitoring
      if (Math.random() < 0.08) { // 8% chance to check growth
        const currentWeight = 1.5 + Math.random() * 0.8;
        const expectedWeight = 1.8;
        const age = 42;
        notificationService.checkGrowthAlerts(currentWeight, expectedWeight, age);
      }
    }, 10000); // Check every 10 seconds for demo purposes

    return () => clearInterval(interval);
  }, []);

  // Manual trigger functions for testing
  const triggerTemperatureAlert = () => {
    notificationService.checkTemperatureAlerts(36);
  };

  const triggerMortalityAlert = () => {
    notificationService.checkMortalityAlerts(20, 8);
  };

  const triggerFeedAlert = () => {
    notificationService.checkFeedAlerts(120, 200);
  };

  return {
    triggerTemperatureAlert,
    triggerMortalityAlert,
    triggerFeedAlert,
  };
};
