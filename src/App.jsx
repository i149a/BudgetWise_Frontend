import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/home_components/Home'
import Login from './components/auth_components/Login'
import Register from './components/auth_components/Register'
import UpdatePassword from './components/auth_components/UpdatePassword';
import Dashboard from './components/home_components/Dashboard'
import Profile from './components/user_components/Profile'
import Transactions from './components/transaction_components/Transactions'
import TransactionForm from './components/transaction_components/TransactionForm'
import Categories from './components/category_components/Categories'
import CategoryForm from './components/category_components/CategoryForm'
import ProtectedRoute from './components/helper_components/ProtectedRoute'

//import css files//
import './styling/App.css';
import './styling/Form.css';
import './styling/Navbar.css';
import './styling/List.css';
import './styling/Calendar.css';
import './styling/Auth.css';


const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/update-password" element={<ProtectedRoute><UpdatePassword /></ProtectedRoute>} />
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