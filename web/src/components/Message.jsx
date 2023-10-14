import { format, parseISO } from 'date-fns'
import { useState, useEffect } from 'react'

export default function Message({ title, text, user, date }) {
    const [userDetails, setUserDetails] = useState(null)
    const userStorage = localStorage.getItem('user')

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (userDetails) return
        setUserDetails(JSON.parse(userStorage))
    },[userDetails, userStorage])

    const formattedDate = format(parseISO(date), 'dd/MM/yyyy HH:mm')
    return (
        <div className="flex flex-col w-[60%] justify-center border border-slate-600 rounded gap-3 bg-zinc-700 px-8 py-4">
            <h1 className="text-xl font-extrabold">{title}</h1>
            <p>{text}</p>
            <div className="flex flex-row justify-between border-t-2 border-zinc-800 pt-2">
                {(token && userDetails) ? (
                    <h4>{user.name} </h4>
                ) : (
                    <h4>Note: Log in to see poster</h4>
                )}
                <h4>{formattedDate}</h4>
            </div>
        </div>
    )
}