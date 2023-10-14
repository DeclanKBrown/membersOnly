export default function Message({ title, text, user, date }) {
    return (
        <div className="flex flex-col w-[60%] justify-center border border-slate-600 rounded gap-3 bg-zinc-700 px-8 py-4">
            <h1 className="text-xl font-extrabold">{title}</h1>
            <p>{text}</p>
            <div className="flex flex-row justify-between border-t-2 border-zinc-800 pt-2">
                <h4>{user} </h4>
                <h4>{date}</h4>
            </div>
        </div>
    )
}