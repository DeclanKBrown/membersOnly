import { useEffect, useState } from "react";


export default function Header({ setModalLogIn, setModalSignUp, setModalLogOut }) {
    const [userDetails, setUserDetails] = useState(null)
    const userStorage = localStorage.getItem('user')

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (userDetails) return
        setUserDetails(JSON.parse(userStorage))
    },[userDetails, userStorage])

    return (
        <header className='flex justify-between px-60 py-5 border-b border-gray-700'>
            <div>
                <a href="/">
                    <h1 className="text-2xl font-extrabold text-sky-500">Members Only</h1>
                </a>
            </div>
            {(token && userDetails) ? (
                <>
                    <div className="flex gap-5 items-center">
                        <h3>Welcome Back {userDetails?.name}</h3>
                        <button onClick={ () => setModalLogOut(true)} className="px-4 py-2 rounded bg-sky-500 hover:opacity-80">Log Out</button>
                    </div>
                </>
                ) : (
                <div className="flex gap-8">
                    <button onClick={ () => setModalLogIn(true)} className="px-4 py-2 rounded bg-sky-500 hover:opacity-80">Log In</button>
                    <button onClick={ () => setModalSignUp(true)} className="px-4 py-2 rounded bg-sky-500 hover:opacity-80">Sign Up</button>
                </div>
            )}
        </header>
    )
}