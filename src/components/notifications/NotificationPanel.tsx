
import React, { useState, useEffect } from 'react';
import { Bell, X, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { notificationService, FarmAlert } from '@/services/notificationService';
import { cn } from '@/lib/utils';

const NotificationPanel = () => {
  const [alerts, setAlerts] = useState<FarmAlert[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = notificationService.subscribe(setAlerts);
    setAlerts(notificationService.getAlerts());
    return unsubscribe;
  }, []);

  const unreadCount = notificationService.getUnreadCount();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'high':
        return <AlertCircle className="h-4 w-4 text-orange-500" />;
      case 'medium':
        return <Info className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-red-500 bg-red-50';
      case 'high':
        return 'border-orange-500 bg-orange-50';
      case 'medium':
        return 'border-yellow-500 bg-yellow-50';
      default:
        return 'border-blue-500 bg-blue-50';
    }
  };

  const handleMarkAsRead = (alertId: string) => {
    notificationService.markAsRead(alertId);
  };

  const handleMarkAllAsRead = () => {
    notificationService.markAllAsRead();
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Notificaciones
            {unreadCount > 0 && (
              <Button variant="outline" size="sm" onClick={handleMarkAllAsRead}>
                Marcar todas como leídas
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] mt-4">
          <div className="space-y-3">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No hay notificaciones
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border-l-4 relative",
                    getSeverityColor(alert.severity),
                    !alert.isRead && "bg-opacity-80"
                  )}
                >
                  {!alert.isRead && (
                    <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full" />
                  )}
                  <div className="flex items-start gap-2">
                    {getSeverityIcon(alert.severity)}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm">{alert.title}</h4>
                      <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {alert.timestamp.toLocaleString('es-ES')}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleMarkAsRead(alert.id)}
                      className="ml-2 p-1 h-6 w-6"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default NotificationPanel;
