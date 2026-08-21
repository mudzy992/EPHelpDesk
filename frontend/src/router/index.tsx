import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '@/pages/LoginPage';
import DashboardPage from '@/pages/DashboardPage';
import TicketsPage from '@/pages/TicketsPage';
import TicketDetailPage from '@/pages/TicketDetailPage';
import AdminPage from '@/pages/AdminPage';

// FAZA 5 (TASKS.md): dodati zaštitu ruta (redirect na /login ako nema sesije)
// nakon što AuthModule i login flow budu gotovi.
export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<DashboardPage />} />
      <Route path="/tickets" element={<TicketsPage />} />
      <Route path="/tickets/:id" element={<TicketDetailPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
