
import React from 'react';
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings, User } from "lucide-react";
import NotificationPanel from '@/components/notifications/NotificationPanel';

const AppHeader = () => {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-4">
      <div className="flex items-center">
        <SidebarTrigger className="mr-4" />
        <h1 className="text-lg font-semibold">Gemelo Digital Avícola</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <NotificationPanel />
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default AppHeader;
