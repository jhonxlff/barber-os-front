import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import AppLayout from "@/components/layout/AppLayout";
import { LandingLayout } from "@/components/landing/LandingLayout";

// Auth
import LoginPage from "@/pages/auth/LoginPage";
import RegisterPage from "@/pages/auth/RegisterPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";

// Landing
import HomePage from "@/pages/landing/HomePage";
import FeaturesPage from "@/pages/landing/FeaturesPage";
import PricingPage from "@/pages/landing/PricingPage";
import ContactPage from "@/pages/landing/ContactPage";
import DemoPage from "@/pages/landing/DemoPage";

// Admin
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

// Client
import ClientLayout from "@/pages/client/ClientLayout";
import AgendarPage from "@/pages/client/AgendarPage";
import MeusAgendamentosPage from "@/pages/client/MeusAgendamentosPage";
import FilaPublicaPage from "@/pages/client/FilaPublicaPage";
import ClientTrackingPage from "@/pages/client/ClientTrackingPage";

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
              {/* Landing Page */}
              <Route element={<LandingLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/features" element={<FeaturesPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/demo" element={<DemoPage />} />
              </Route>

              {/* Auth */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Client App */}
              <Route path="/c/:tenant" element={<ClientLayout />}>
                <Route index element={<Navigate to="agendar" replace />} />
                <Route path="agendar" element={<AgendarPage />} />
                <Route path="meus-agendamentos" element={<MeusAgendamentosPage />} />
                <Route path="fila" element={<FilaPublicaPage />} />
                <Route path="tracking/:appointmentId" element={<ClientTrackingPage />} />
              </Route>

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
