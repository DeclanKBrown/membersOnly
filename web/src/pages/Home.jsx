import { useState, useEffect } from 'react';
import axios from 'axios';
import Message from '../components/Message';

export default function Home({ setModalMessage }) {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/all-posts')
                console.log(response)
                setMessages(response.data.allPosts)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        fetchData();
    }, []);

    const [userDetails, setUserDetails] = useState(null)
    const userStorage = localStorage.getItem('user')

    const token = localStorage.getItem("token");

    useEffect(() => {
        if (userDetails) return
        setUserDetails(JSON.parse(userStorage))
    },[userDetails, userStorage])

    return (
        <main className="flex flex-col w-full items-center">
        <h1 className="mt-7 mb-5 text-2xl font-bold">Messages</h1>
            {(token && userDetails) && (
                <button onClick={() => setModalMessage(true)} className="px-4 py-2 rounded bg-sky-500 hover:opacity-80 mb-10">+ Message</button>
            )}
            {messages.length > 0 ? (
                messages.map((message) => (
                    <Message
                        key={message._id}
                        title={message.title}
                        text={message.text}
                        user={message.user}
                        date={message.timestamp}
                    />
                ))
            ) : (
                <h3>No messages yet</h3>
            )}
        </main>
    )
    
}