import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    const [message, setMessage] = useState('');
    const [chatLog, setChatLog] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        setChatLog((prev) => [...prev, { role: 'user', content: message }]);
        setLoading(true);

        try {            
            const res = await axios.post('/api/ai-consult', { message });
            console.log("AI response:", res.data);

            const aiReply = res.data.reply ?? "⚠️ No reply from AI.";
            setChatLog((prev) => [...prev, { role: 'assistant', content: aiReply }]);
        } catch (err) {
            console.error(err);
            setChatLog((prev) => [...prev, { role: 'assistant', content: "⚠️ Something went wrong!" }]);
        }

        setMessage('');
        setLoading(false);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="w-full mx-auto p-4">
                <h2 className="text-xl mb-4">Ask your legal questions below 👇</h2>

                <div className="border rounded p-4 h-100 overflow-y-auto mb-4 bg-white shadow">
                    {chatLog.map((msg, idx) => (
                        <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                            <span
                                className={`inline-block p-2 rounded ${
                                    msg.role === 'user' ? 'bg-green-200' : 'bg-gray-200'
                                }`}
                            >
                                {msg.content}
                            </span>
                        </div>
                    ))}
                    {loading && <div className="text-center text-gray-500 text-sm">Consulting legal AI...</div>}
                </div>

                <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type your question..."
                        className="flex-1 border px-3 py-2 rounded"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-green-600 text-white px-4 rounded hover:bg-green-700 disabled:opacity-50"
                    >
                        Send
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
