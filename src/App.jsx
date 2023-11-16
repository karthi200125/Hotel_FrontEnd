import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useContext, lazy, Suspense } from 'react';
import { AuthContext, AuthContextProvider } from './context/AuthContext';
import Loading from './components/Loading/Loading';

const SuspenseWrapper = (Component) => (props) => (
  <Suspense fallback={<Loading />}>
    <Component {...props} />
  </Suspense>
);

const Home = SuspenseWrapper(lazy(() => import('./pages/Home/Home')));
const List = SuspenseWrapper(lazy(() => import('./pages/List/List')));
const Hotel = SuspenseWrapper(lazy(() => import('./pages/Hotel/Hotel')));
const Login = SuspenseWrapper(lazy(() => import('./pages/Login/Login')));
const Register = SuspenseWrapper(lazy(() => import('./pages/Register/Register')));

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
