import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { useStore } from '@/lib/store';
import { AppLayout } from '@/components/layout/AppLayout';
import Login from '@/pages/Login';
import Dashboard from '@/pages/Dashboard';
import Members from '@/pages/Members';
import Invoices from '@/pages/Invoices';
import Accounting from '@/pages/Accounting';

function App() {
  const { user } = useStore();

  return (
    <Router>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/" replace />} 
        />
        
        <Route
          path="/"
          element={
            user ? (
              <AppLayout>
                <Dashboard />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/members"
          element={
            user ? (
              <AppLayout>
                <Members />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/invoices"
          element={
            user ? (
              <AppLayout>
                <Invoices />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/accounting"
          element={
            user ? (
              <AppLayout>
                <Accounting />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Fallback for Payments (Redirect to Invoices for MVP) */}
        <Route
          path="/payments"
          element={
            user ? (
              <AppLayout>
                <Invoices />
              </AppLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;