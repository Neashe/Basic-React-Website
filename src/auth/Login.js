import { useState } from "react";
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useNavigate,useLocation } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/protected"
    const {auth, setAuth} = useAuth()

    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');




    const API = axios.create({
        baseURL: "http://localhost:5000",
        withCredentials: true,
      });
    
    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await API.post("/login", {
        username,
        password,
        }).then((res) => {
        if (res.data.token) {
            const token = res.data.token;
            setAuth({token});
            setUsername("");
            setPassword("");
            navigate(from, { replace: true });
        } else {
            console.log("incorrect submission");
            setError(res.message);
        }
        });
    } catch (err) {
        if (!err?.response) {
        setError("no server response");
        } else {
        setError("authentication failed");
        }
    }
    };

    return ( 
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" 
                required
                id ='username'
                onChange={(e)=>setUsername(e.target.value)} />
                
                <label htmlFor="password">Password: </label>
                <input type="password" 
                required
                id = 'password'
                onChange={(e)=>setPassword(e.target.value)}/>

                <button type="submit">Login</button>

                {error && <div>{error}</div>}
            </form>
        </div>
     );
}
 
export default Login;
