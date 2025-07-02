
import { toast } from "@/hooks/use-toast";

export interface FarmAlert {
  id: string;
  type: 'temperature' | 'mortality' | 'feed' | 'water' | 'growth' | 'system';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

export class NotificationService {
  private alerts: FarmAlert[] = [];
  private listeners: ((alerts: FarmAlert[]) => void)[] = [];

  // Temperature monitoring
  checkTemperatureAlerts(temperature: number) {
    if (temperature > 30) {
      this.createAlert({
        type: 'temperature',
        severity: temperature > 35 ? 'critical' : 'high',
        title: 'Alta Temperatura',
        message: `Temperatura detectada: ${temperature}°C. Se requiere ventilación inmediata.`
      });
    } else if (temperature < 18) {
      this.createAlert({
        type: 'temperature',
        severity: temperature < 15 ? 'critical' : 'medium',
        title: 'Baja Temperatura',
        message: `Temperatura detectada: ${temperature}°C. Se requiere calefacción.`
      });
    }
  }

  // Mortality monitoring
  checkMortalityAlerts(dailyMortality: number, averageMortality: number) {
    const threshold = averageMortality * 1.5;
    if (dailyMortality > threshold) {
      this.createAlert({
        type: 'mortality',
        severity: dailyMortality > averageMortality * 2 ? 'critical' : 'high',
        title: 'Alta Mortalidad',
        message: `Mortalidad diaria: ${dailyMortality} aves. Revisar condiciones sanitarias.`
      });
    }
  }

  // Feed consumption monitoring
  checkFeedAlerts(consumption: number, expected: number) {
    const deviation = Math.abs(consumption - expected) / expected;
    if (deviation > 0.2) {
      this.createAlert({
        type: 'feed',
        severity: deviation > 0.4 ? 'high' : 'medium',
        title: consumption < expected ? 'Bajo Consumo de Alimento' : 'Alto Consumo de Alimento',
        message: `Consumo actual: ${consumption}kg vs esperado: ${expected}kg`
      });
    }
  }

  // Water consumption monitoring
  checkWaterAlerts(consumption: number, expected: number) {
    const deviation = Math.abs(consumption - expected) / expected;
    if (deviation > 0.15) {
      this.createAlert({
        type: 'water',
        severity: deviation > 0.3 ? 'high' : 'medium',
        title: consumption < expected ? 'Bajo Consumo de Agua' : 'Alto Consumo de Agua',
        message: `Consumo actual: ${consumption}L vs esperado: ${expected}L`
      });
    }
  }

  // Growth monitoring
  checkGrowthAlerts(currentWeight: number, expectedWeight: number, age: number) {
    const deviation = (currentWeight - expectedWeight) / expectedWeight;
    if (Math.abs(deviation) > 0.1) {
      this.createAlert({
        type: 'growth',
        severity: Math.abs(deviation) > 0.2 ? 'high' : 'medium',
        title: deviation < 0 ? 'Crecimiento Lento' : 'Crecimiento Acelerado',
        message: `Peso actual: ${currentWeight}kg vs esperado: ${expectedWeight}kg (${age} días)`
      });
    }
  }

  private createAlert(alertData: Omit<FarmAlert, 'id' | 'timestamp' | 'isRead'>) {
    const alert: FarmAlert = {
      ...alertData,
      id: Date.now().toString(),
      timestamp: new Date(),
      isRead: false
    };

    this.alerts.unshift(alert);
    this.notifyListeners();
    this.showToast(alert);
  }

  private showToast(alert: FarmAlert) {
    const variant = alert.severity === 'critical' || alert.severity === 'high' ? 'destructive' : 'default';
    
    toast({
      title: alert.title,
      description: alert.message,
      variant,
    });
  }

  getAlerts(): FarmAlert[] {
    return this.alerts;
  }

  getUnreadCount(): number {
    return this.alerts.filter(alert => !alert.isRead).length;
  }

  markAsRead(alertId: string) {
    const alert = this.alerts.find(a => a.id === alertId);
    if (alert) {
      alert.isRead = true;
      this.notifyListeners();
    }
  }

  markAllAsRead() {
    this.alerts.forEach(alert => alert.isRead = true);
    this.notifyListeners();
  }

  subscribe(listener: (alerts: FarmAlert[]) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener(this.alerts));
  }
}

export const notificationService = new NotificationService();
