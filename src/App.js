import './App.css';
import Hello from './Hello';
import Navbar from './Navbar';
import ProductsBrowser from './products/ProductsBrowser';
import {BrowserRouter as Router,Routes,Route, Navigate} from "react-router-dom";
import Login from './auth/Login';
import { AuthProvider } from './context/authProvider';
import Protected from './Protected';
import useAuth from './hooks/useAuth';
function App() {

  const PrivateRoute = ({ element }) => {
    const { auth } = useAuth();
    console.log(auth.token);
    return auth.token ? element : <Navigate to="/login" />;
  };

  return (
    <Router>    
      <div className="App">
        <Navbar/>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Hello />} />
            <Route path="/products/*" element={<ProductsBrowser />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/protected" element={<PrivateRoute element={<Protected/>}/>}/>
          </Routes>
        </AuthProvider>
      </div>
    </Router>

  );
}

export default App;
