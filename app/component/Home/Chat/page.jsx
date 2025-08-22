"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image"; // if you use Next.js

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, sender: "ai", text: "👋 مرحبًا! كيف يمكنني مساعدتك اليوم؟" },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newUserMessage = {
      id: Date.now(),
      sender: "user",
      text: input,
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInput("");

    setTimeout(() => {
      const newAIMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "🤖 هذا رد افتراضي على: " + input,
      };
      setMessages((prev) => [...prev, newAIMessage]);
    }, 800);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card
        className="w-full max-w-4xl flex flex-col h-[90vh] border-gray border rounded-xl shadow-xl"
        dir="rtl"
      >
        <CardHeader className="bg-orange-500 rounded-t-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/images/Logo.png" // 🧠 replace with your real logo path
              alt="AI Logo"
              width={40}
              height={40}
              className="rounded-full bg-white p-1"
            />
            <h2 className="text-xl font-bold text-white">الدردشة مع السباك</h2>
          </div>
        </CardHeader>

        <CardContent className="flex-1 overflow-y-auto space-y-3 px-6 py-6 bg-white">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                ref={bottomRef}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`max-w-lg px-4 py-2 snap-start rounded-lg shadow text-sm whitespace-pre-line ${
                  msg.sender === "user"
                    ? "bg-orange-500 text-white ml-auto"
                    : "bg-gray-100 text-gray-800 mr-auto"
                }`}
              >
                {msg.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <div />
        </CardContent>

        <CardFooter className="bg-white border-t border-gray px-6 py-4 flex gap-2">
          <Input
            className="flex-1 text-right border-3 border-gray focus:ring-orange-400 py-7 "
            placeholder="اكتب رسالتك هنا..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
          />
          <Button
            onClick={sendMessage}
            className="bg-orange-500 p-7 hover:bg-orange-600 text-white"
          >
            إرسال
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
