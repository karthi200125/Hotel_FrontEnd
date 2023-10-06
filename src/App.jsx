import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import Loading from './components/Loading/Loading';

const Home = lazy(() => import('./pages/Home/Home'));
const List = lazy(() => import('./pages/List/List'));
const Hotel = lazy(() => import('./pages/Hotel/Hotel'));
const Login = lazy(() => import('./pages/Login/Login'));
const Register = lazy(() => import('./pages/Register/Register'));

const PrivateRoute = ({ element: Element, ...props }) => {
  const { user } = useContext(AuthContext);

  return user ? <Element {...props} /> : <Navigate to="/" />;
};

const App = () => {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<PrivateRoute element={Home} />} />
            <Route path="/hotels" element={<PrivateRoute element={List} />} />
            <Route path="/hotel" element={<PrivateRoute element={Hotel} />} />
            <Route path="/loading" element={<PrivateRoute element={Loading} />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContextProvider>
  );
};

export default App;
