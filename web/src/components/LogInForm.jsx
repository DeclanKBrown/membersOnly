import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LogInForm({ setModalLogIn }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/login-local', {
                username: email,
                password: password
            });
            if (response.status >= 200 && response.status < 300) {
                toast(response.data.message)
                setModalLogIn(false)
                const token = response.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response.data.user))
            } else {
                toast(response.data.message)
            }
        } catch (error) {
            console.error('Error Logging in', error)
            toast(error.message)
        }
    }

    return ( 
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={() => setModalLogIn(false)}>
            <div className="bg-gray-500 p-8 rounded-lg" onClick={ (e)=> e.stopPropagation() }>
                <form className="flex flex-col gap-2">
                    <svg className="self-end cursor-pointer" onClick={() => setModalLogIn(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <label htmlFor='email' className="text-l select-none">Email address</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)} value={email} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <label htmlFor='password' className="text-l">Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-sky-500 rounded py-1">Log In</button>
                </form>
            </div>
        </div>
    )
}