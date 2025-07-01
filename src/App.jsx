import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';
import CategoryList from './components/CategoryList';
import CategoryForm from './components/CategoryForm';
import HomePage from './components/HomePage';
import Profile from './components/Profile';

// CSS
import './components/styling/App.css';
import './components/styling/Form.css';
import './components/styling/Navbar.css';
import './components/styling/List.css';
import './components/styling/Calendar.css';

// Auth context
export const AuthContext = React.createContext();

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { currentUser } = React.useContext(AuthContext);
  return currentUser ? children : <Navigate to="/signin" replace />;
};

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setCurrentUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  if (loading) {
    return <div className="loading-screen">Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ currentUser, handleLogin, handleLogout }}>
      <BrowserRouter>
        <div className="App">
          {currentUser && <Navbar />}
          <Routes>
            {/* Public routes */}
            <Route 
              path="/signin" 
              element={currentUser ? <Navigate to="/" /> : <SignIn />} 
            />
            <Route 
              path="/signup" 
              element={currentUser ? <Navigate to="/" /> : <SignUp />} 
            />

            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions" 
              element={
                <ProtectedRoute>
                  <TransactionList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions/new" 
              element={
                <ProtectedRoute>
                  <TransactionForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/transactions/edit/:id" 
              element={
                <ProtectedRoute>
                  <TransactionForm editMode={true} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/categories" 
              element={
                <ProtectedRoute>
                  <CategoryList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/categories/new" 
              element={
                <ProtectedRoute>
                  <CategoryForm />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />

            <Route path="/add-transaction" element={<Navigate to="/transactions/new" replace />} />

          </Routes>
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;