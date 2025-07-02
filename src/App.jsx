import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Transactions from './components/Transactions'
import TransactionForm from './components/TransactionForm'
import Categories from './components/Categories'
import CategoryForm from './components/CategoryForm'
import ProtectedRoute from './components/ProtectedRoute'

//import css files//
import './components/styling/App.css';
import './components/styling/Form.css';
import './components/styling/Navbar.css';
import './components/styling/List.css';
import './components/styling/Calendar.css';
import './components/styling/Auth.css';


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
        <Route path="/transactions/new" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
        <Route path="/transactions/:id" element={<ProtectedRoute><TransactionForm /></ProtectedRoute>} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
        <Route path="/categories/new" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
        <Route path="/categories/:id" element={<ProtectedRoute><CategoryForm /></ProtectedRoute>} />
      </Routes>
    </>
  )
}

export default App