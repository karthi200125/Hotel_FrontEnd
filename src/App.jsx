import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import Home from './pages/Home/Home';
import List from './pages/List/List';
import Hotel from './pages/Hotel/Hotel';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Loading from './components/Loading/Loading';


const PrivateRoute = ({ element: Element, ...props }) => {
  const { user } = useContext(AuthContext);

  return user ? <Element {...props} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<PrivateRoute element={Home} />} />
          <Route path="/hotels" element={<PrivateRoute element={List} />} />
          <Route path="/hotel" element={<PrivateRoute element={Hotel} />} />
          <Route path="/loading" element={<PrivateRoute element={Loading} />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
