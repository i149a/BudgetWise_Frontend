import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';

// Import your existing components
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TransactionList from './components/TransactionList';
import TransactionForm from './components/TransactionForm';

// Import CSS files from the components/styling folder
import './components/styling/App.css';
import './components/styling/Form.css';
import './components/styling/Navbar.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar /> {/* Ensure Navbar is displayed */}
        <Routes>
          {/* Public routes */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected routes */}
          <Route path="/transactions" element={<TransactionList />} />
          <Route path="/add-transaction" element={<TransactionForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;