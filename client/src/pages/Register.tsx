import React, { useContext , useState, useEffect} from 'react';
import { AuthContext } from '../context/AuthContext.tsx';
import API from '../services/api.tsx';
import { useNavigate } from 'react-router';

export default function Register(){
    const {login , user} = useContext<any>(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user){
            navigate('/boards');
        }
    }, [user, navigate])

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Form Data: ${JSON.stringify(form)}`);
        const {data} = await API.post('/auth/register', form);
        login(data);
        
        navigate('/boards');
    }

    return(
<div className="auth-container">
    <h2>Create Account</h2>

    <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Name' onChange={(e) => setForm({...form, name: e.target.value})}/>
        <input type="email" placeholder='Email' onChange={(e) => setForm({...form, email: e.target.value})}/>
        <input type="password" placeholder='Password' onChange={(e) => setForm({...form, password: e.target.value})}/>
        <button type='submit'>Create</button>
    </form>
</div>
    )
}
