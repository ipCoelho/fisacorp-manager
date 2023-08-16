import { BrowserRouter as Router } from "react-router-dom"

import 'antd/dist/antd.css';

import { AuthProvider } from './hooks/AuthContext';

import Routes from './router'


export default function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </Router>
    </>
  )
}