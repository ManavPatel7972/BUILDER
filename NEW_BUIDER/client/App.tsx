import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Infrastructure from "./pages/Infrastructure";
import Drainage from "./pages/Drainage";
import AirQuality from "./pages/AirQuality";
import BloodBank from "./pages/BloodBank";
import SchoolTransport from "./pages/SchoolTransport";
import Emergency from "./pages/Emergency";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/infrastructure" element={<Infrastructure />} />
          <Route path="/drainage" element={<Drainage />} />
          <Route path="/air-quality" element={<AirQuality />} />
          <Route path="/blood-bank" element={<BloodBank />} />
          <Route path="/school-transport" element={<SchoolTransport />} />
          <Route path="/emergency" element={<Emergency />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
