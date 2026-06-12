// SaveInterview.jsx

import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

import API from "../api/auth/components/services/api";

import {
    FaSave,
    FaUserTie,
    FaStar,
    FaBrain,
    FaCheckCircle,
    FaAward,
} from "react-icons/fa";

export default function SaveInterview() {

    const [role, setRole] = useState("Frontend Developer");

    const [score, setScore] = useState(0);

    const [feedback, setFeedback] = useState("");

    const [loading, setLoading] = useState(false);

    const [success, setSuccess] = useState(false);

    const nav = useNavigate();

    //  SAVE INTERVIEW
    const saveInterview = async () => {

        try {

            setLoading(true);

            const userId =
                localStorage.getItem("userId");

            const username =
                localStorage.getItem("username");

            //  API
            const res = await API.post(
                "/interview/save",
                {
                    userId,
                    role,
                    score,
                    feedback,
                }
            );

            console.log(res.data);

            //  SUCCESS
            setSuccess(true);

            // SAVE CERTIFICATE DATA
            localStorage.setItem(
                "certificateRole",
                role
            );

            localStorage.setItem(
                "certificateScore",
                score
            );

            localStorage.setItem(
                "username",
                username || "AI Candidate"
            );

            //  QUICK START CERTIFICATE PAGE
            setTimeout(() => {

                nav("/certificate");

            }, 1500);

        } catch (err) {

            console.log(err);

            alert("Error saving interview");

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen bg-[#f5f7fb] px-5 py-10 overflow-hidden relative">

            {/* BACKGROUND */}
            <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-blue-400/20 blur-[140px]" />

            <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-purple-400/20 blur-[140px]" />

            {/* HEADER */}
            <div className="max-w-5xl mx-auto mb-10">

                <motion.h1
                    initial={{
                        opacity: 0,
                        y: -20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="text-5xl font-black text-gray-800"
                >

                    Save Interview Report

                </motion.h1>

                <p className="text-gray-500 mt-3 text-lg">
                    Store interview results and AI feedback
                </p>

            </div>

            {/* MAIN CARD */}
            <motion.div
                initial={{
                    opacity: 0,
                    y: 40,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="max-w-5xl mx-auto bg-white rounded-[35px] shadow-2xl p-10"
            >

                {/* ROLE */}
                <div className="mb-8">

                    <label className="text-gray-700 font-semibold mb-3 block">
                        Select Role
                    </label>

                    <div className="relative">

                        <FaUserTie className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500" />

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-5 outline-none"
                        >

                            <option>
                                Frontend Developer
                            </option>

                            <option>
                                Backend Developer
                            </option>

                            <option>
                                Full Stack Developer
                            </option>

                            <option>
                                HR Interview
                            </option>

                        </select>

                    </div>

                </div>

                {/* SCORE */}
                <div className="mb-8">

                    <label className="text-gray-700 font-semibold mb-3 block">
                        Interview Score
                    </label>

                    <div className="relative">

                        <FaStar className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-500" />

                        <input
                            type="number"
                            min="0"
                            max="10"
                            value={score}
                            onChange={(e) =>
                                setScore(e.target.value)
                            }
                            className="w-full bg-gray-100 rounded-2xl py-4 pl-14 pr-5 outline-none"
                        />

                    </div>

                </div>

                {/* FEEDBACK */}
                <div className="mb-8">

                    <label className="text-gray-700 font-semibold mb-3 block">
                        AI Feedback
                    </label>

                    <div className="relative">

                        <FaBrain className="absolute left-5 top-6 text-purple-500" />

                        <textarea
                            value={feedback}
                            onChange={(e) =>
                                setFeedback(e.target.value)
                            }
                            placeholder="Write interview feedback..."
                            className="w-full h-44 bg-gray-100 rounded-2xl p-5 pl-14 outline-none resize-none"
                        />

                    </div>

                </div>

                {/* BUTTON */}
                <motion.button
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={saveInterview}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-5 rounded-2xl text-xl font-bold shadow-xl flex items-center justify-center gap-3"
                >

                    <FaSave />

                    {loading
                        ? "Saving Interview..."
                        : "Save Interview"}

                </motion.button>

                {/* SUCCESS */}
                {success && (

                    <motion.div
                        initial={{
                            opacity: 0,
                            y: 20,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                        }}
                        className="mt-8 bg-green-50 rounded-2xl p-5 flex items-center gap-4"
                    >

                        <FaCheckCircle className="text-green-500 text-2xl" />

                        <div>

                            <h3 className="font-bold text-gray-800 text-lg">
                                Interview Saved Successfully
                            </h3>

                            <p className="text-gray-500 mt-1">
                                Redirecting to Certificate...
                            </p>

                        </div>

                    </motion.div>
                )}

                {/* CERTIFICATE BUTTON */}
                <motion.button
                    whileHover={{
                        scale: 1.03,
                    }}
                    whileTap={{
                        scale: 0.95,
                    }}
                    onClick={() =>
                        nav("/certificate")
                    }
                    className="mt-6 w-full bg-yellow-400 text-black py-4 rounded-2xl text-lg font-bold shadow-lg flex items-center justify-center gap-3"
                >

                    <FaAward />

                    Open Certificate

                </motion.button>

            </motion.div>

        </div>
    );
}