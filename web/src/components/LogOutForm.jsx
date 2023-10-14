import axios from "axios"
import { toast } from "react-hot-toast"

export default function logOutForm({ setModalLogOut }) {
    function handleCancel(e) {
        e.preventDefault()
        setModalLogOut(false)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/log-out')
            if (response.status >= 200 && response.status < 300) {
                toast(response.data.message)
                setModalLogOut(false)
                localStorage.removeItem("token");
                localStorage.removeItem("user")
            } else {
                toast(response.data.message)
            }
        } catch (error) {
            console.error('Error Logging in', error)
            toast(error.message)
        }

    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={() => setModalLogOut(false)}>
            <div className="bg-gray-500 p-8 rounded-lg" onClick={ (e)=> e.stopPropagation() }>
                <h3 className="text-l mb-4">Are you sure you want to log out?</h3>
                <form className="flex flex-row gap-2 justify-around">
                    <button type="cancel" onClick={(e) => handleCancel(e)} className="bg-slate-500 border border-sky-500 rounded py-1 px-2 hover:opacity-60">Cancel</button>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-sky-500 rounded py-1 px-2 hover:opacity-80">Log Out</button>
                </form>         
            </div>
        </div>
    )
} 