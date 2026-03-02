import React, {useState, useContext, useEffect} from 'react';
import { AuthContext } from "../context/AuthContext.tsx";
import API from '../services/api.tsx';
import { useNavigate } from 'react-router';

export default function Login(){
    const {login, user} = useContext<any>(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            navigate("/boards");
        }
    }, [user,navigate]);

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {data} = await API.post('/auth/login', form);
        login(data);
        navigate("/boards");
    }
    
    return(
        <div className="auth-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <input type="email" placeholder='Email' 
                onChange={e => setForm({ ...form, email: e.target.value})} />

                <input type="password" placeholder='Password' 
                onChange={e => setForm({...form, password: e.target.value})} />

                <button type="submit">Login</button>
            </form>
        </div>
    );
}
