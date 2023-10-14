import Layout from './layouts/Layout';
import Home from './pages/Home'
import LogIn from './components/LogInForm'
import SignUp from './components/SignUpForm'
import LogOut from './components/LogOutForm'
import Message from './components/MessageForm';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App() {
    const [modalLogIn, setModalLogIn] = useState(false)
    const [modalLogOut, setModalLogOut] = useState(false)
    const [modalSignUp, setModalSignUp] = useState(false)
    const [modalMessage, setModalMessage] = useState(false)

    return (
        <>
            <Layout 
                setModalLogIn={setModalLogIn} 
                setModalLogOut={setModalLogOut}
                setModalSignUp={setModalSignUp} 
            >
            <Toaster />
                <Home setModalMessage={setModalMessage} />
            </Layout>
            {(modalLogIn) && <LogIn setModalLogIn={setModalLogIn} />}
            {(modalSignUp) && <SignUp setModalSignUp={setModalSignUp} />}
            {(modalLogOut) && <LogOut setModalLogOut={setModalLogOut} />}
            {(modalMessage) && <Message setModalMessage={setModalMessage} />}
        </>
    )
}