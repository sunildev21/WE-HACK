import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { SendHorizontal, User, BotMessageSquare, Clock } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Overview',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const res = await axios.get('/chat-history');
                setChatLog(res.data);
            } catch (error) {
                console.error("Error loading chat history:", error);
            }
        };
        fetchChatHistory();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatLog, loading]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setChatLog((prev) => [...prev, { role: 'user', content: message, time: new Date() }]);
        setLoading(true);

        try {
            const res = await axios.post(`/api/ai-consult`, { message });
            const aiReply = res.data.reply ?? "⚠️ No reply from Legal-Buddy.";
            setChatLog((prev) => [
                ...prev,
                { role: 'assistant', content: aiReply, time: new Date() },
            ]);
        } catch (err) {
            console.error(err);
            setChatLog((prev) => [
                ...prev,
                { role: 'assistant', content: "⚠️ Something went wrong!", time: new Date() },
            ]);
        }

        setMessage('');
        setLoading(false);
    };

    const renderAssistantMessage = (content: string, time: Date) => {
        return (
            <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-3 max-w-[80%]">
                <div className="flex items-center gap-2 mb-2">
                    <BotMessageSquare className="text-blue-500" />
                    <h4 className="font-bold text-blue-600">Legal-Buddy says:</h4>
                    <span className="text-xs text-gray-500 ml-auto flex items-center gap-1">
                        <Clock size={12} /> {dayjs(time).format('HH:mm')}
                    </span>
                </div>
                <div className="text-gray-700 whitespace-pre-line">{content}</div>
            </div>
        );
    };

    const renderUserMessage = (content: string, time: Date) => (
        <div className="text-right mb-3 max-w-[80%] ml-auto">
            <div className="flex justify-end items-center gap-2 mb-1">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock size={12} /> {dayjs(time).format('HH:mm')}
                </span>
                <User className="text-green-500" />
            </div>
            <div className="bg-green-100 p-3 rounded-lg inline-block shadow-sm text-gray-800">
                {content}
            </div>
        </div>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="w-full mx-auto p-4">
                <h2 className="text-3xl font-bold mb-2">👋 Meet Legal-Buddy!</h2>
                <p className="mb-4 text-gray-600">
                    Your friendly legal consultant for all Indian law questions.  
                    Type your query below — Legal-Buddy has your back! 😊
                </p>

                <div
                    className="border rounded p-4 h-[35rem] overflow-y-auto mb-4 bg-white shadow-sm"
                    ref={chatContainerRef}
                >
                    {chatLog.map((msg, idx) =>
                        msg.role === 'assistant'
                            ? renderAssistantMessage(msg.content, msg.time)
                            : renderUserMessage(msg.content, msg.time)
                    )}
                    {loading && (
                        <div className="text-center text-gray-500 text-sm mt-2">
                            Legal-Buddy is typing... 🤔
                        </div>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Ask Legal-Buddy anything..."
                        className="flex-1 border px-3 py-2 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-neutral-900 text-white px-4 rounded-lg hover:bg-neutral-950 disabled:opacity-50"
                    >
                        <SendHorizontal />
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
