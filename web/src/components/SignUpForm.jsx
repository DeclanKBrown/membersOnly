import { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function SignUpForm({ setModalSignUp }) {
    const [fields, setFields] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    function setFormField(name, value) {
        setFields(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/sign-up', {
                name: fields.name,
                email: fields.email,
                password: fields.password,
                confirmPassword: fields.confirmPassword,
            })
            if (response.status >= 200 && response.status < 300) {
                toast('Success')
                setModalSignUp(false)
                const token = response.data.token;
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(response.data.user))
            }
        } catch (error) {
            console.error('Error Signing Up', error)
            toast(error.response.data.message)
        }
    }

    return ( 
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={() => setModalSignUp(false)}>
            <div className="bg-gray-500 p-8 rounded-lg" onClick={ (e)=> e.stopPropagation() }>
                <form className="flex flex-col gap-2">
                    <svg className="self-end cursor-pointer" onClick={() => setModalSignUp(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <label name='name' className="text-l select-none">Name</label>
                    <input type="text" onChange={(e) => setFormField('name', e.target.value)} value={fields.name} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <label name='email' className="text-l select-none">Email address</label>
                    <input type="text" onChange={(e) => setFormField('email', e.target.value)} value={fields.email} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <label name='password' className="text-l">Password</label>
                    <input type="password" onChange={(e) => setFormField('password', e.target.value)} value={fields.password} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <label name='password' className="text-l">Confirm password</label>
                    <input type="password" onChange={(e) => setFormField('confirmPassword', e.target.value)} value={fields.confirmPassword} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-sky-500 rounded py-1">Sign Up</button>
                </form>
            </div>
        </div>
    )
}