
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Support from "./pages/Support";
import { ThemeProvider } from "./hooks/use-theme";
import { DeviceProvider } from "./hooks/use-device";

// Admin Dashboard Pages
import ShopsPage from "./pages/admin/ShopsPage";
import ProductsPage from "./pages/admin/ProductsPage";
import OrdersPage from "./pages/admin/OrdersPage";
import RevenuePage from "./pages/admin/RevenuePage";
import UsersPage from "./pages/admin/UsersPage";
import PromotionsPage from "./pages/admin/PromotionsPage";
import WalletPage from "./pages/admin/WalletPage";
import CommunicationPage from "./pages/admin/CommunicationPage";
import EscalationsPage from "./pages/admin/EscalationsPage";
import AnalyticsPage from "./pages/admin/AnalyticsPage";
import SettingsPage from "./pages/admin/SettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <DeviceProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/support" element={<Support />} />
              
              {/* Admin Dashboard Routes */}
              <Route path="/shops" element={<ShopsPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/revenue" element={<RevenuePage />} />
              <Route path="/users" element={<UsersPage />} />
              <Route path="/promotions" element={<PromotionsPage />} />
              <Route path="/wallet" element={<WalletPage />} />
              <Route path="/communication" element={<CommunicationPage />} />
              <Route path="/escalations" element={<EscalationsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </DeviceProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
