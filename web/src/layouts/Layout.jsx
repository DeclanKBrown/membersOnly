import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Layout({ children, setModalLogIn, setModalSignUp, setModalLogOut }) {
    return (
        <>
        <Header
            setModalLogIn={setModalLogIn}
            setModalSignUp={setModalSignUp}
            setModalLogOut={setModalLogOut}
        ></Header>
            <main className='h-[calc(100vh-8rem)]'>{children}</main>
        <Footer></Footer>
        </>
    )
}