
import './App.css'
import { AuthProvider } from './context/AuthContext'
import { TicketProvider } from './context/TicketContext'
import { AppRouter } from './components/routes/appRouter'
import './index.css'
import { NotificationProvider } from './context/NotificationContext'
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary'




function App() {
  return (
    <ErrorBoundary>
      <NotificationProvider>
        <AuthProvider>
          <TicketProvider>
            <AppRouter />
          </TicketProvider>
        </AuthProvider>
      </NotificationProvider>
    </ErrorBoundary>
  )
}

export default App
