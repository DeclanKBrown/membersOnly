import Layout from './layouts/Layout';
import Home from './pages/Home'
import LogIn from './components/LogInForm'
import SignUp from './components/SignUpForm'
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';

export default function App() {
    const [modalLogIn, setModalLogIn] = useState(false)
    const [modalSignUp, setModaSignUp] = useState(false)

    return (
        <>
            <Layout setModalLogIn={setModalLogIn} setModaSignUp={setModaSignUp}>
                <Toaster />
                <Home />
            </Layout>
            {(modalLogIn) && <LogIn setModalLogIn={setModalLogIn} />}
            {(modalSignUp) && <SignUp setModaSignUp={setModaSignUp} />}
        </>
    )
}