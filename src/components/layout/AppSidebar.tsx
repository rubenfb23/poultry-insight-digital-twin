
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar
} from "@/components/ui/sidebar";
import { 
  Gauge,
  ThermometerSun,
  Layers3,
  Droplets,
  Timer,
  PowerIcon,
  Battery,
  ArrowDown,
  FileInput,
  Sensor
} from "lucide-react";
import { useLocation } from 'react-router-dom';

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const monitoringItems = [
    { icon: Gauge, label: "Dashboard", path: "/" },
    { icon: ThermometerSun, label: "Ambiente", path: "/environmental" },
    { icon: Layers3, label: "Alimentación", path: "/feeding" },
    { icon: ArrowDown, label: "Mortandad", path: "/mortality" },
    { icon: Timer, label: "Peso y Crecimiento", path: "/growth" },
    { icon: PowerIcon, label: "Consumos", path: "/consumption" },
    { icon: Droplets, label: "Gemelo Digital", path: "/digital-twin" }
  ];

  const dataEntryItems = [
    { icon: FileInput, label: "Datos Manuales", path: "/manual-data" },
    { icon: Sensor, label: "Configurar Sensor", path: "/sensor-config" }
  ];

  // Function to check if the current route is active
  const isActive = (path: string) => currentPath === path;
  
  // Class for active and inactive nav links
  const getNavClass = ({ isActive }: { isActive: boolean }) => 
    isActive 
      ? "flex items-center p-2 w-full rounded-md bg-muted text-primary font-medium" 
      : "flex items-center p-2 w-full rounded-md hover:bg-muted/50";

  return (
    <Sidebar
      className={`transition-all duration-300 ${collapsed ? "w-14" : "w-64"} border-r`}
      collapsible="icon"
    >
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent>
        <div className="px-3 py-4">
          <div className="mb-6 flex justify-center items-center">
            {collapsed ? (
              <Battery className="h-6 w-6 text-farm-blue" />
            ) : (
              <div className="flex flex-col items-center">
                <Battery className="h-8 w-8 text-farm-blue" />
                <h1 className="mt-2 text-lg font-semibold">Gemelo Digital Avícola</h1>
              </div>
            )}
          </div>
          
          <SidebarGroup>
            <SidebarGroupLabel>
              {!collapsed && "Monitoreo"}
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu>
                {monitoringItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.path} className={getNavClass}>
                        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>
              {!collapsed && "Entrada de Datos"}
            </SidebarGroupLabel>
            
            <SidebarGroupContent>
              <SidebarMenu>
                {dataEntryItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.path} className={getNavClass}>
                        <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                        {!collapsed && <span>{item.label}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
