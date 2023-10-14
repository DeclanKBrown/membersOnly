import Layout from './layouts/Layout';
import Home from './pages/Home'
import LogIn from './components/LogInForm'
import SignUp from './components/SignUpForm'
import LogOut from './components/LogOutForm'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Message from './components/Message';

export default function App() {
    const [modalLogIn, setModalLogIn] = useState(false)
    const [modalSignUp, setModalSignUp] = useState(false)
    const [modalMessage, setModalMessage] = useState(false)
    const [modalLogOut, setModalLogOut] = useState(false)

    return (
        <>
            <Layout 
                setModalLogIn={setModalLogIn} 
                setModalSignUp={setModalSignUp} 
                setModalLogOut={setModalLogOut}
            >
            <Toaster />
                <Home setModalMessage={setModalMessage} />
            </Layout>
            {(modalMessage) && <Message setModalMessage={setModalMessage} />}
            {(modalLogIn) && <LogIn setModalLogIn={setModalLogIn} />}
            {(modalSignUp) && <SignUp setModalSignUp={setModalSignUp} />}
            {(modalLogOut) && <LogOut setModalLogOut={setModalLogOut} />}
        </>
    )
}