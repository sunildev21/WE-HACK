"use client";
import { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleChat = async () => {
    try {
      const res = await axios.post("/api/chat", { query });
      setResponse(res.data.answer);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error fetching response");
    }
  };

  return (
    <div className="p-5">
      <textarea
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask a legal question..."
        className="w-full p-3 border"
      />
      <button
        onClick={handleChat}
        className="mt-2 px-4 py-2 bg-blue-600 text-white"
      >
        Ask
      </button>
      <div className="mt-4">{response}</div>
    </div>
  );
};

export default Chatbot;
