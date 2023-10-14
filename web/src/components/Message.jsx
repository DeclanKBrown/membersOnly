export default function Message({ title, text, user, date }) {
    return (
        <div className="flex flex-col w-[60%] justify-center border border-slate-600">
            <h1>{title}</h1>
            <p>{text}</p>
            <div className="flex flex-row justify-between">
                <h4>{user} </h4>
                <h4>{date}</h4>
            </div>
        </div>
    )
}