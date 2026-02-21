import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import AgendaPage from "@/pages/admin/AgendaPage";
import ClientesPage from "@/pages/admin/ClientesPage";
import ClienteDetalhePage from "@/pages/admin/ClienteDetalhePage";
import FinanceiroPage from "@/pages/admin/FinanceiroPage";
import EquipePage from "@/pages/admin/EquipePage";
import ConfiguracoesPage from "@/pages/admin/ConfiguracoesPage";
import AutomacoesPage from "@/pages/admin/AutomacoesPage";
import FilaPage from "@/pages/admin/FilaPage";
import EstoquePage from "@/pages/admin/EstoquePage";
import AvaliacoesPage from "@/pages/admin/AvaliacoesPage";
import TrackingPage from "@/pages/admin/TrackingPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />

              {/* Admin Panel */}
              <Route path="/app/:tenant" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="agenda" element={<AgendaPage />} />
                <Route path="clientes" element={<ClientesPage />} />
                <Route path="clientes/:clientId" element={<ClienteDetalhePage />} />
                <Route path="financeiro" element={<FinanceiroPage />} />
                <Route path="equipe" element={<EquipePage />} />
                <Route path="configuracoes" element={<ConfiguracoesPage />} />
                <Route path="automacoes" element={<AutomacoesPage />} />
                <Route path="fila" element={<FilaPage />} />
                <Route path="estoque" element={<EstoquePage />} />
                <Route path="avaliacoes" element={<AvaliacoesPage />} />
                <Route path="tracking/:appointmentId" element={<TrackingPage />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
