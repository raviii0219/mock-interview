import { useState, useEffect, useRef } from "react";

import { motion } from "framer-motion";

import API from "../api/auth/components/services/api";

import {
    FaRobot,
    FaPaperPlane,
    FaMicrophone,
    FaStop,
    FaUserCircle,
} from "react-icons/fa";

export default function Chatbot() {

    const [message, setMessage] =
        useState("");

    const [chat, setChat] =
        useState([]);

    const [loading, setLoading] =
        useState(false);

    const [listening, setListening] =
        useState(false);

    const recognitionRef =
        useRef(null);

    const chatEndRef =
        useRef(null);

    // 🚀 AUTO SCROLL
    useEffect(() => {

        chatEndRef.current
            ?.scrollIntoView({

                behavior: "smooth",
            });

    }, [chat]);

    //  SEND MESSAGE
    const sendMessage =
        async () => {

            if (!message) return;

            // USER MESSAGE
            const userMsg = {

                type: "user",

                text: message,
            };

            setChat((prev) => [

                ...prev,

                userMsg,
            ]);

            try {

                setLoading(true);

                const res =
                    await API.post(

                        "/chatbot/chat",

                        {
                            message,
                        }
                    );

                // AI MESSAGE
                const aiMsg = {

                    type: "ai",

                    text:
                        res.data.reply,
                };

                setChat((prev) => [

                    ...prev,

                    aiMsg,
                ]);

                // 🔊 AI SPEAK
                const speech =
                    new SpeechSynthesisUtterance(

                        res.data.reply
                    );

                speech.lang =
                    "en-US";

                speech.rate = 1;

                window.speechSynthesis.speak(

                    speech
                );

                setMessage("");

            } catch (err) {

                console.log(err);

                alert(
                    "Chatbot Error"
                );

            } finally {

                setLoading(false);
            }
        };

    // 🎤 START VOICE
    const startListening =
        () => {

            const SpeechRecognition =

                window.SpeechRecognition ||

                window.webkitSpeechRecognition;

            if (
                !SpeechRecognition
            ) {

                alert(
                    "Speech Recognition not supported"
                );

                return;
            }

            const recognition =
                new SpeechRecognition();

            recognition.lang =
                "en-US";

            recognition.continuous =
                true;

            recognition.interimResults =
                true;

            recognition.onstart =
                () => {

                    setListening(
                        true
                    );
                };

            recognition.onresult =
                (
                    event
                ) => {

                    let transcript =
                        "";

                    for (
                        let i = 0;
                        i <
                        event.results
                            .length;
                        i++
                    ) {

                        transcript +=
                            event.results[
                                i
                            ][0]
                                .transcript +
                            " ";
                    }

                    setMessage(
                        transcript
                    );
                };

            recognition.onerror =
                () => {

                    setListening(
                        false
                    );
                };

            recognition.onend =
                () => {

                    if (
                        listening
                    ) {

                        recognition.start();
                    }
                };

            recognitionRef.current =
                recognition;

            recognition.start();
        };

    //  STOP VOICE
    const stopListening =
        () => {

            setListening(false);

            recognitionRef.current?.stop();
        };

    return (

        <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] overflow-hidden relative">

            {/* GLOW EFFECTS */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

            {/* MAIN */}
            <div className="relative z-10 max-w-6xl mx-auto px-5 py-10">

                {/* HEADER */}
                <motion.div

                    initial={{
                        opacity: 0,
                        y: -40,
                    }}

                    animate={{
                        opacity: 1,
                        y: 0,
                    }}

                    className="flex items-center justify-between mb-10"
                >

                    <div>

                        <h1 className="text-5xl font-black text-white">

                            AI Interview Assistant

                        </h1>

                        <p className="text-gray-300 mt-3 text-lg">

                            Smart AI chatbot for interview preparation

                        </p>

                    </div>

                    {/* ROBOT ICON */}
                    <motion.div

                        animate={{
                            y: [0, -10, 0],
                        }}

                        transition={{
                            repeat: Infinity,
                            duration: 3,
                        }}

                        className="w-24 h-24 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-2xl"
                    >

                        <FaRobot className="text-white text-5xl" />

                    </motion.div>

                </motion.div>

                {/* CHAT CONTAINER */}
                <motion.div

                    initial={{
                        opacity: 0,
                        scale: 0.95,
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1,
                    }}

                    className="backdrop-blur-2xl bg-white/10 border border-white/10 rounded-[40px] shadow-2xl overflow-hidden"
                >

                    {/* CHAT HEADER */}
                    <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">

                        <div className="flex items-center gap-4">

                            <div className="w-16 h-16 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">

                                <FaRobot className="text-white text-3xl" />

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold text-white">

                                    AI Career Mentor

                                </h2>

                                <p className="text-green-400 text-sm mt-1">

                                    ● Online

                                </p>

                            </div>

                        </div>

                        {/* STATUS */}
                        <div className="text-right">

                            <h3 className="text-white font-semibold">

                                NLP + Gemini AI

                            </h3>

                            <p className="text-gray-400 text-sm">

                                Real-time assistant

                            </p>

                        </div>

                    </div>

                    {/* CHAT AREA */}
                    <div className="h-[65vh] overflow-y-auto px-8 py-8 space-y-6">

                        {chat.length === 0 && (

                            <motion.div

                                initial={{
                                    opacity: 0,
                                }}

                                animate={{
                                    opacity: 1,
                                }}

                                className="flex flex-col items-center justify-center h-full text-center"
                            >

                                <div className="w-28 h-28 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mb-6 shadow-2xl">

                                    <FaRobot className="text-white text-5xl" />

                                </div>

                                <h2 className="text-3xl font-bold text-white">

                                    Ask Anything

                                </h2>

                                <p className="text-gray-300 mt-3 max-w-lg">

                                    Interview preparation, coding help, resume guidance,
                                    HR questions, career advice and much more.

                                </p>

                            </motion.div>
                        )}

                        {chat.map(
                            (
                                msg,
                                i
                            ) => (

                                <motion.div

                                    key={i}

                                    initial={{
                                        opacity: 0,
                                        y: 20,
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0,
                                    }}

                                    className={`flex ${msg.type ===
                                        "user"

                                        ? "justify-end"

                                        : "justify-start"
                                        }`}
                                >

                                    <div

                                        className={`max-w-[75%] rounded-[30px] px-6 py-5 shadow-xl ${msg.type ===
                                            "user"

                                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"

                                            : "bg-white/10 backdrop-blur-xl text-white border border-white/10"
                                            }`}
                                    >

                                        <div className="flex items-center gap-3 mb-3">

                                            {msg.type ===
                                                "user"

                                                ? (

                                                    <FaUserCircle className="text-2xl" />

                                                ) : (

                                                    <FaRobot className="text-2xl text-blue-400" />
                                                )}

                                            <h3 className="font-bold">

                                                {msg.type ===
                                                    "user"

                                                    ? "You"

                                                    : "AI Assistant"}

                                            </h3>

                                        </div>

                                        <p className="leading-relaxed whitespace-pre-wrap">

                                            {msg.text}

                                        </p>

                                    </div>

                                </motion.div>
                            )
                        )}

                        {/* LOADING */}
                        {loading && (

                            <motion.div

                                initial={{
                                    opacity: 0,
                                }}

                                animate={{
                                    opacity: 1,
                                }}

                                className="flex justify-start"
                            >

                                <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-[30px] px-6 py-5">

                                    <div className="flex gap-2">

                                        <div className="w-3 h-3 rounded-full bg-blue-400 animate-bounce" />

                                        <div className="w-3 h-3 rounded-full bg-purple-400 animate-bounce delay-100" />

                                        <div className="w-3 h-3 rounded-full bg-cyan-400 animate-bounce delay-200" />

                                    </div>

                                </div>

                            </motion.div>
                        )}

                        <div ref={chatEndRef} />

                    </div>

                    {/* INPUT AREA */}
                    <div className="p-6 border-t border-white/10 bg-black/10 backdrop-blur-xl">

                        <div className="flex items-center gap-4">

                            {/* INPUT */}
                            <div className="flex-1 relative">

                                <input

                                    type="text"

                                    placeholder="Ask interview questions, coding doubts, resume help..."

                                    value={message}

                                    onChange={(e) =>
                                        setMessage(
                                            e.target.value
                                        )
                                    }

                                    onKeyDown={(e) => {

                                        if (
                                            e.key ===
                                            "Enter"
                                        ) {

                                            sendMessage();
                                        }
                                    }}

                                    className="w-full bg-white/10 border border-white/10 rounded-3xl px-6 py-5 text-white placeholder:text-gray-400 outline-none backdrop-blur-xl"
                                />

                            </div>

                            {/* VOICE */}
                            {!listening ? (

                                <motion.button

                                    whileHover={{
                                        scale: 1.08,
                                    }}

                                    whileTap={{
                                        scale: 0.9,
                                    }}

                                    onClick={
                                        startListening
                                    }

                                    className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-xl"
                                >

                                    <FaMicrophone className="text-white text-xl" />

                                </motion.button>

                            ) : (

                                <motion.button

                                    whileHover={{
                                        scale: 1.08,
                                    }}

                                    whileTap={{
                                        scale: 0.9,
                                    }}

                                    onClick={
                                        stopListening
                                    }

                                    className="w-16 h-16 rounded-2xl bg-red-500 flex items-center justify-center shadow-xl"
                                >

                                    <FaStop className="text-white text-xl" />

                                </motion.button>
                            )}

                            {/* SEND */}
                            <motion.button

                                whileHover={{
                                    scale: 1.08,
                                }}

                                whileTap={{
                                    scale: 0.9,
                                }}

                                onClick={
                                    sendMessage
                                }

                                className="w-16 h-16 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-xl"
                            >

                                <FaPaperPlane className="text-white text-xl" />

                            </motion.button>

                        </div>

                        {/* STATUS */}
                        <div className="mt-4 flex items-center justify-between">

                            <p className="text-gray-400 text-sm">

                                {
                                    listening

                                        ? "🎤 Listening..."

                                        : "AI Assistant Ready"
                                }

                            </p>

                            <p className="text-gray-500 text-sm">

                                Powered by Gemini AI

                            </p>

                        </div>

                    </div>

                </motion.div>

            </div>

        </div>
    );
}