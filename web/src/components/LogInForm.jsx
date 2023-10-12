export default function LogInForm({ setModalLogIn }) {
    return ( 
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={() => setModalLogIn(false)}>
            <div className="bg-gray-500 p-8 rounded-lg" onClick={ (e)=> e.stopPropagation() }>
                <form className="flex flex-col gap-2">
                    <svg className="self-end cursor-pointer" onClick={() => setModalLogIn(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <label name='email' className="text-l select-none">Email address</label>
                    <input type="text" className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <label name='password' className="text-l">Password</label>
                    <input type="text" className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <button type="submit" className="bg-sky-500 rounded py-1">Log In</button>
                </form>
            </div>
        </div>
    )
}