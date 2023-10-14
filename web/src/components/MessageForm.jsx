import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

export default function MessageForm({ setModalMessage }) {
    const [fields, setFields] = useState({
        title: '',
        text: '',
    })

    function setFormField(name, value) {
        setFields(prev => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()

        try {
            const response = await axios.post('http://localhost:3000/create-post', {
                title: fields.title,
                text: fields.text,
                id: JSON.parse(localStorage.getItem('user')).id
            })
            if (response.status === 200) {
                toast('Success')
                setModalMessage(false)
            } else {
                console.error(response)
                toast(response.message)
            }
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50" onClick={() => setModalMessage(false)}>
            <div className="bg-gray-500 p-8 rounded-lg" onClick={ (e)=> e.stopPropagation() }>
                <form className="flex flex-col gap-2">
                    <svg className="self-end cursor-pointer" onClick={() => setModalMessage(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <label name='title' className="text-l select-none">Title</label>
                    <input type="text" onChange={(e) => setFormField('title', e.target.value)} value={fields.title} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></input>
                    <label name='message' className="text-l select-none">Message</label>
                    <textarea type="text" onChange={(e) => setFormField('text', e.target.value)} value={fields.text} className="py-1 pl-1 min-w-[20rem] rounded mb-5 focus:outline-none focus:outline-sky-500"></textarea>
                    <button type="submit" onClick={(e) => handleSubmit(e)} className="bg-sky-500 rounded py-1">Post</button>
                </form>
            </div>
        </div>
    )
}