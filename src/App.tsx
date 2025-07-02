
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import EnvironmentalPage from "./pages/EnvironmentalPage";
import FeedingPage from "./pages/FeedingPage";
import MortalityPage from "./pages/MortalityPage";
import GrowthPage from "./pages/GrowthPage";
import ConsumptionPage from "./pages/ConsumptionPage";
import DigitalTwinPage from "./pages/DigitalTwinPage";
import ManualDataPage from "./pages/ManualDataPage";
import SensorConfigPage from "./pages/SensorConfigPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/environmental" element={<EnvironmentalPage />} />
            <Route path="/feeding" element={<FeedingPage />} />
            <Route path="/mortality" element={<MortalityPage />} />
            <Route path="/growth" element={<GrowthPage />} />
            <Route path="/consumption" element={<ConsumptionPage />} />
            <Route path="/digital-twin" element={<DigitalTwinPage />} />
            <Route path="/manual-data" element={<ManualDataPage />} />
            <Route path="/sensor-config" element={<SensorConfigPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
