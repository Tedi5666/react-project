import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRouter from './router/AppRouter';
import { ToastProvider } from './context/ToastContext';
import Toasts from './components/Toasts';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <div className="app-container">
            <Header />
            <main className="content">
              <AppRouter />
            </main>
            <Footer />
          </div>
          <Toasts />
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;
