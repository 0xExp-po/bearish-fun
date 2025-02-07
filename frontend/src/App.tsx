import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import WalletProvider from './contexts/WalletProvider';
import { BalanceProvider } from './contexts/BalanceContext';
function App() {
  return (
    <div className="App">
      <WalletProvider>
        <BalanceProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />} >
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Router>
        </BalanceProvider>
      </WalletProvider>
    </div>
  )
}

export default App
