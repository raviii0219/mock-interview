import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import API from "../api/auth/components/services/api";

import {
    FaMicrophone,
    FaVideo,
    FaArrowRight,
    FaCheckCircle,
    FaStop,
} from "react-icons/fa";

export default function Interview() {

    const questions =
        JSON.parse(localStorage.getItem("questions")) || [];

    const [index, setIndex] = useState(0);

    const [answer, setAnswer] = useState("");

    const [report, setReport] = useState("");

    const [loading, setLoading] = useState(false);

    const [listening, setListening] = useState(false);

    const videoRef = useRef(null);

    const recognitionRef = useRef(null);

    const nav = useNavigate();

    const total = questions.length;

    //  CAMERA
    useEffect(() => {

        navigator.mediaDevices
            .getUserMedia({
                video: true,
                audio: true,
            })
            .then((stream) => {

                if (videoRef.current) {

                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {

                console.log(err);

                alert("Camera permission denied");
            });

    }, []);

    //  SPEAK QUESTION
    useEffect(() => {

        if (!questions[index]) return;

        const speech = new SpeechSynthesisUtterance(
            questions[index]
        );

        speech.lang = "en-US";

        speech.rate = 1;

        window.speechSynthesis.cancel();

        window.speechSynthesis.speak(speech);

    }, [index]);

    //  START VOICE
    const startListening = () => {

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            alert(
                "Speech Recognition not supported. Use Google Chrome."
            );

            return;
        }

        if (recognitionRef.current) {

            recognitionRef.current.stop();
        }

        const recognition = new SpeechRecognition();

        recognition.lang = "en-US";

        recognition.continuous = true;

        recognition.interimResults = true;

        recognition.maxAlternatives = 1;

        recognition.onstart = () => {

            setListening(true);
        };

        recognition.onresult = (event) => {

            let transcript = "";

            for (
                let i = 0;
                i < event.results.length;
                i++
            ) {

                transcript +=
                    event.results[i][0].transcript + " ";
            }

            //  AUTO WRITE ANSWER
            setAnswer(transcript);
        };

        recognition.onerror = (event) => {

            console.log(event.error);

            setListening(false);
        };

        recognition.onend = () => {

            setListening(false);
        };

        recognition.start();

        recognitionRef.current = recognition;
    };

    //  STOP VOICE
    const stopListening = () => {

        recognitionRef.current?.stop();

        setListening(false);
    };

    // SUBMIT ANSWER
    const submitAnswer = async () => {

        if (!answer) {

            return alert("Please answer the question");
        }

        try {

            setLoading(true);

            const res = await API.post("interview/evaluate", {

                question: questions[index],

                answer,
            });

            setReport(res.data.feedback);


        } catch (err) {

            console.log(err);

            alert("Error evaluating answer");

        } finally {

            setLoading(false);
        }
    };

    //  NEXT QUESTION / SAVE INTERVIEW
    const nextQuestion = async () => {

        // LAST QUESTION
        if (index === total - 1) {

            try {

                const userId = localStorage.getItem("userId");

                //  SAVE INTERVIEW
                await API.post("/interview/save", {

                    userId,

                    role: localStorage.getItem("role"),
                    score: 7,

                    feedback: report,
                });

                //  GO ANALYTICS
                nav("/analytics");

            } catch (err) {

                console.log(err);

                alert("Error saving interview");
            }

            return;
        }

        // NEXT
        setIndex(index + 1);

        setAnswer("");

        setReport("");

        stopListening();
    };

    // NO QUESTIONS
    if (!questions.length) {

        return (

            <div className="min-h-screen flex items-center justify-center text-3xl font-bold text-gray-700">

                No Questions Found

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f5f7fb] px-5 py-10">

            {/* HEADER */}
            <div className="max-w-7xl mx-auto mb-10 flex items-center justify-between">

                <div>

                    <h1 className="text-4xl font-black text-gray-800">
                        AI Interview Session
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Google-style AI interview experience
                    </p>

                </div>

                {/* PROGRESS */}
                <div className="w-56">

                    <div className="flex justify-between mb-2">

                        <span className="text-sm text-gray-500">
                            Progress
                        </span>

                        <span className="text-sm font-bold text-blue-500">
                            {index + 1}/{total}
                        </span>

                    </div>

                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">

                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${((index + 1) / total) * 100}%`,
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 via-red-400 via-yellow-400 to-green-500"
                        />

                    </div>

                </div>

            </div>

            {/* MAIN */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8">

                {/* LEFT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="lg:col-span-2 bg-white rounded-[30px] shadow-xl p-8"
                >

                    {/* QUESTION HEADER */}
                    <div className="flex items-center gap-4 mb-6">

                        <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center">

                            <FaMicrophone className="text-blue-500 text-2xl" />

                        </div>

                        <div>

                            <h2 className="text-2xl font-bold text-gray-800">
                                Interview Question
                            </h2>

                            <p className="text-gray-500 text-sm">
                                Speak naturally and AI writes answer automatically
                            </p>

                        </div>

                    </div>

                    {/* QUESTION */}
                    <div className="bg-gray-100 rounded-3xl p-7">

                        <p className="text-gray-800 text-xl leading-relaxed font-medium">

                            {questions[index]}

                        </p>

                    </div>

                    {/* ANSWER */}
                    <textarea
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        placeholder="Your spoken answer will appear here..."
                        className="w-full mt-6 h-56 rounded-3xl bg-gray-100 p-6 outline-none resize-none text-gray-700 text-lg"
                    />

                    {/* STATUS */}
                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">

                        <div
                            className={`w-3 h-3 rounded-full ${listening
                                ? "bg-red-500 animate-pulse"
                                : "bg-gray-400"
                                }`}
                        />

                        {listening
                            ? "Listening... Speak now"
                            : "Click Start Voice"}

                    </div>

                    {/* BUTTONS */}
                    <div className="flex flex-wrap gap-4 mt-8">

                        {/* START */}
                        {!listening ? (

                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                onClick={() => {

                                    navigator.mediaDevices
                                        .getUserMedia({
                                            audio: true,
                                        })
                                        .then(() => {

                                            startListening();
                                        })
                                        .catch((err) => {

                                            console.log(err);

                                            alert(
                                                "Please allow microphone permission"
                                            );
                                        });
                                }}
                                className="flex items-center gap-3 bg-blue-500 text-white px-7 py-4 rounded-2xl shadow-lg"
                            >

                                <FaMicrophone />

                                Start Voice

                            </motion.button>

                        ) : (

                            <motion.button
                                whileHover={{
                                    scale: 1.03,
                                }}
                                whileTap={{
                                    scale: 0.95,
                                }}
                                onClick={stopListening}
                                className="flex items-center gap-3 bg-red-500 text-white px-7 py-4 rounded-2xl shadow-lg"
                            >

                                <FaStop />

                                Stop Voice

                            </motion.button>
                        )}

                        {/* SUBMIT */}
                        <motion.button
                            whileHover={{
                                scale: 1.03,
                            }}
                            whileTap={{
                                scale: 0.95,
                            }}
                            onClick={submitAnswer}
                            disabled={loading}
                            className="bg-green-500 text-white px-7 py-4 rounded-2xl shadow-lg"
                        >

                            {loading
                                ? "Checking..."
                                : "Submit Answer"}

                        </motion.button>

                    </div>

                    {/* REPORT */}
                    {report && (

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mt-8 bg-green-50 rounded-3xl p-7"
                        >

                            <div className="flex items-center gap-3 mb-4">

                                <FaCheckCircle className="text-green-500 text-2xl" />

                                <h3 className="text-2xl font-bold text-gray-800">
                                    AI Feedback
                                </h3>

                            </div>

                            <p className="text-gray-700 leading-relaxed text-lg">

                                {report}

                            </p>

                            {/* NEXT / FINISH */}
                            {index < total - 1 ? (

                                <motion.button
                                    whileHover={{
                                        scale: 1.03,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    onClick={nextQuestion}
                                    className="mt-7 flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                                >

                                    Next Question

                                    <FaArrowRight />

                                </motion.button>

                            ) : (

                                <motion.button
                                    whileHover={{
                                        scale: 1.03,
                                    }}
                                    whileTap={{
                                        scale: 0.95,
                                    }}
                                    onClick={nextQuestion}
                                    className="mt-7 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-2xl shadow-lg"
                                >

                                    Finish Interview

                                    <FaCheckCircle />

                                </motion.button>
                            )}

                        </motion.div>
                    )}

                </motion.div>

                {/* RIGHT */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white rounded-[30px] shadow-xl overflow-hidden h-fit"
                >

                    {/* CAMERA HEADER */}
                    <div className="p-6 border-b">

                        <div className="flex items-center gap-3">

                            <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center">

                                <FaVideo className="text-red-500 text-2xl" />

                            </div>

                            <div>

                                <h2 className="text-2xl font-bold text-gray-800">
                                    Live Camera
                                </h2>

                                <p className="text-gray-500 text-sm">
                                    AI interview monitoring
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* CAMERA */}
                    <div className="p-5">

                        <motion.video
                            ref={videoRef}
                            autoPlay
                            muted
                            className="w-full h-[33vh] object-cover rounded-3xl bg-black shadow-lg"
                        />

                    </div>

                </motion.div>

            </div>

        </div>
    );
}