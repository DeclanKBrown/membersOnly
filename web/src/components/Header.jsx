export default function Header({ setModalLogIn, setModaSignUp }) {
    return (
        <header className='flex justify-between px-60 py-5 border-b border-gray-700'>
            <div>
                <a href="/">
                    <h1 className="text-2xl font-extrabold text-sky-500">Members Only</h1>
                </a>
            </div>
            <div className="flex gap-8">
                <button onClick={ () => setModalLogIn(true)} className="px-4 py-2 rounded bg-sky-500 hover:opacity-80">Log In</button>
                <button onClick={ () => setModaSignUp(true)} className="px-4 py-2 rounded bg-sky-500 hover:opacity-80">Sign Up</button>
            </div>
        </header>
    )
}