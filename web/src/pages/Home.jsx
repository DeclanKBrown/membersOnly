import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/all-posts')
                setMessages(response.data.allPosts)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        };

        fetchData();
    }, []);

    return (
        <main className="flex flex-col w-full items-center">
            <h1 className="mt-7 mb-14 text-2xl font-bold">Messages</h1>
            {(messages.length > 0) ? (
                <>

                </>) : (
                    <h3> No messages yet</h3>
                )}
        </main>
    )
}