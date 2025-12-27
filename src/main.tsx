import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import './styles/theme.css'
import './styles/components.css'
import './styles/dashboard.css'
import './styles/auth.css'
import './styles/tickets.css'
import './styles/layout.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
     <AuthProvider>
      <App></App>
    </AuthProvider>
  </BrowserRouter>

)
