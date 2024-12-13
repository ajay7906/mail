
// import './App.css'
// import AuthPage from './components/AuthComponents'

// import MailDashboard from './components/MailDashboard'

// function App() {
  

//   return (
//     <>
//       <MailDashboard/>
//       <AuthPage/>
//     </>
//   )
// }

// export default App





















































import { useState, useEffect } from 'react';
import './App.css';
import AuthPage from './components/AuthComponents';
import MailDashboard from './components/MailDashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on initial render
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Assuming token is stored in localStorage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (token) => {
    // Save token to localStorage and update state
    localStorage.setItem('authToken', token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Clear token from localStorage and update state
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

  return (
    <>
      {isLoggedIn ? (
        <MailDashboard onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} />
      )}
    </>
  );
}

export default App;






