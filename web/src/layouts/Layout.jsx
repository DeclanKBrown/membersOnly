import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children, setModalLogIn, setModaSignUp }) {
    return (
        <>
        <Header
            setModalLogIn={setModalLogIn}
            setModaSignUp={setModaSignUp}
        ></Header>
            <main className='h-[calc(100vh-8rem)]'>{children}</main>
        <Footer></Footer>
        </>
    )
}